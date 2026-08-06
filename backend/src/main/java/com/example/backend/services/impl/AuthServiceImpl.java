package com.example.backend.services.impl;



import java.time.LocalDateTime;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.config.JwtService;
import com.example.backend.dto.auth.ChangePasswordRequest;
import com.example.backend.dto.auth.ChangeUsernameRequest;
import com.example.backend.dto.auth.ForgotPasswordRequest;
import com.example.backend.dto.auth.LoginRequest;
import com.example.backend.dto.auth.LoginResponse;
import com.example.backend.dto.auth.RefreshTokenRequest;
import com.example.backend.dto.auth.RefreshTokenResponse;
import com.example.backend.entities.PendingPasswordReset;
import com.example.backend.entities.RefreshToken;
import com.example.backend.entities.User;
import com.example.backend.entities.otp.PendingLogin;
import com.example.backend.entities.otp.PendingPasswordChange;
import com.example.backend.entities.otp.PendingRegistration;
import com.example.backend.entities.otp.PendingUsernameChange;
import com.example.backend.enums.OtpPurpose;
import com.example.backend.exceptions.User.DuplicateUserException;
import com.example.backend.repositories.PendingPasswordResetRepository;
import com.example.backend.repositories.UserRepository;
import com.example.backend.repositories.otp.PendingLoginRepository;
import com.example.backend.repositories.otp.PendingPasswordChangeRepository;
import com.example.backend.repositories.otp.PendingRegistrationRepository;
import com.example.backend.repositories.otp.PendingUsernameChangeRepository;
import com.example.backend.services.AuthService;
import com.example.backend.services.RefreshTokenService;
import com.example.backend.services.otp.OtpService;
import com.example.backend.dto.auth.RegisterRequest;
import com.example.backend.dto.auth.ResendOtpRequest;
import com.example.backend.dto.auth.ResetPasswordRequest;
import com.example.backend.dto.auth.VerifyChangePasswordRequest;
import com.example.backend.dto.auth.VerifyChangeUsernameRequest;
import com.example.backend.dto.auth.VerifyForgotPasswordOtpRequest;
import com.example.backend.dto.auth.VerifyLoginOtpRequest;



@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PendingRegistrationRepository pendingRegistrationRepository;
    private final OtpService otpService;
    
    private final PendingPasswordChangeRepository pendingPasswordChangeRepository;
    private final PendingUsernameChangeRepository pendingUsernameChangeRepository;
    private final PendingLoginRepository pendingLoginRepository;
    private final PendingPasswordResetRepository pendingPasswordResetRepository;
    
    private final RefreshTokenService refreshTokenService;
   
    
    
    
    
    
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(AuthenticationManager authenticationManager,UserRepository userRepository,
                       JwtService jwtService, PasswordEncoder passwordEncoder,PendingRegistrationRepository pendingRegistrationRepository,
                       OtpService otpService,PendingPasswordChangeRepository pendingPasswordChangeRepository,PendingUsernameChangeRepository pendingUsernameChangeRepository,PendingLoginRepository pendingLoginRepository
                       ,RefreshTokenService refreshTokenService,PendingPasswordResetRepository pendingPasswordResetRepository) {

        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.pendingRegistrationRepository = pendingRegistrationRepository;
        this.otpService = otpService;
        this.pendingPasswordChangeRepository = pendingPasswordChangeRepository;
        this.pendingUsernameChangeRepository = pendingUsernameChangeRepository;
        this.pendingLoginRepository = pendingLoginRepository;
        this.refreshTokenService = refreshTokenService;
        this.pendingPasswordResetRepository = pendingPasswordResetRepository;
       
        
    }
    
//    @Override
//    public User createUser(User user) {
//
//        // Username validation
//        if (userRepository.existsByUsername(user.getUsername())) {
//            throw new DuplicateUserException(
//                    "Username already exists : " + user.getUsername());
//        }
//
//        // Email validation
//        if (userRepository.existsByEmail(user.getEmail())) {
//            throw new DuplicateUserException(
//                    "Email already exists : " + user.getEmail());
//        }
//
//        // Phone validation
//        if (userRepository.existsByPhone(user.getPhone())) {
//            throw new DuplicateUserException(
//                    "Phone number already exists : " + user.getPhone());
//        }
//
//        // Employee ID validation
//        if (userRepository.existsByEmployeeId(user.getEmployeeId())) {
//            throw new DuplicateUserException(
//                    "Employee ID already exists : " + user.getEmployeeId());
//        }
//
//        // Encrypt Password
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//
//        return userRepository.save(user);
//    }
    
    @Override
    @Transactional
    public void registerRequest(RegisterRequest request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new DuplicateUserException(
                    "Username already exists");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateUserException(
                    "Email already exists");
        }

        if (userRepository.existsByPhone(request.getPhone())) {
            throw new DuplicateUserException(
                    "Phone already exists");
        }

        if (userRepository.existsByEmployeeId(request.getEmployeeId())) {
            throw new DuplicateUserException(
                    "Employee ID already exists");
        }

        pendingRegistrationRepository.deleteByEmail(request.getEmail());

        PendingRegistration pending = new PendingRegistration();

        pending.setEmployeeId(request.getEmployeeId());
        pending.setFullName(request.getFullName());
        pending.setEmail(request.getEmail());
        pending.setPhone(request.getPhone());
        pending.setUsername(request.getUsername());

        // Don't encode yet. Encode after OTP verification.
        pending.setPassword(request.getPassword());

        pending.setRole(request.getRole());
        pending.setCreatedAt(LocalDateTime.now());

        pendingRegistrationRepository.save(pending);

        otpService.generateOtp(
                request.getEmail(),
                OtpPurpose.REGISTRATION
        );
    }
    
    
    @Override
    @Transactional
    public User verifyRegistration(String email, String otp) {

    	boolean verified = otpService.verifyOtp(
    	        email,
    	        otp,
    	        OtpPurpose.REGISTRATION);

    	if (!verified) {
    	    throw new RuntimeException("Invalid or expired OTP.");
    	}

        PendingRegistration pending = pendingRegistrationRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Registration request not found."));

        User user = new User();

        user.setEmployeeId(pending.getEmployeeId());
        user.setFullName(pending.getFullName());
        user.setEmail(pending.getEmail());
        user.setPhone(pending.getPhone());
        user.setUsername(pending.getUsername());

        user.setPassword(
                passwordEncoder.encode(pending.getPassword())
        );

        user.setRole(pending.getRole());

        User savedUser = userRepository.save(user);

        pendingRegistrationRepository.delete(pending);

        return savedUser;
    }
   

// @Override
//public LoginResponse login(LoginRequest request) {
//
//    Authentication authentication = authenticationManager.authenticate(
//            new UsernamePasswordAuthenticationToken(
//                    request.getUsername(),
//                    request.getPassword()));
//
//    User user = userRepository.findByUsername(authentication.getName())
//            .orElseThrow(() -> new RuntimeException("User not found"));
//
//    String token = jwtService.generateToken(
//            (UserDetails) authentication.getPrincipal());
//
//    return LoginResponse.builder()
//            .id(user.getId())
//            .employeeId(user.getEmployeeId())
//            .fullName(user.getFullName())
//            .username(user.getUsername())
//            .email(user.getEmail())
//            .role(user.getRole())
//            .token(token)
//            .build();
//}
 
    @Override
    public LoginResponse login(LoginRequest request) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()));

        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String accessToken = jwtService.generateToken(
                (UserDetails) authentication.getPrincipal());

        RefreshToken refreshToken =
                refreshTokenService.createRefreshToken(user);

        return LoginResponse.builder()
                .id(user.getId())
                .employeeId(user.getEmployeeId())
                .fullName(user.getFullName())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .accessToken(accessToken)
                .refreshToken(refreshToken.getToken())
                .build();
    }
    
 @Override
 public void forgotPassword(ForgotPasswordRequest request) {

     User user = userRepository.findByEmail(request.getEmail())
             .orElseThrow(() ->
                     new RuntimeException("User not found with this email"));

     otpService.generateOtp(
             user.getEmail(),
             OtpPurpose.FORGOT_PASSWORD
     );
 }
 
// @Override
// public void verifyForgotPasswordOtp(
//         VerifyForgotPasswordOtpRequest request) {
//
//     boolean valid = otpService.verifyOtp(
//             request.getEmail(),
//             request.getOtp(),
//             OtpPurpose.FORGOT_PASSWORD
//     );
//
//     if (!valid) {
//         throw new RuntimeException("Invalid OTP");
//     }
// }
// 
 
 @Override
 public void verifyForgotPasswordOtp(
         VerifyForgotPasswordOtpRequest request) {

     boolean valid = otpService.verifyOtp(
             request.getEmail(),
             request.getOtp(),
             OtpPurpose.FORGOT_PASSWORD
     );

     if (!valid) {
         throw new RuntimeException("Invalid OTP");
     }

     // Remove any previous pending record
     pendingPasswordResetRepository.deleteByEmail(request.getEmail());

     // Create a new pending password reset record
     PendingPasswordReset pending = new PendingPasswordReset();

     pending.setEmail(request.getEmail());
     pending.setCreatedAt(LocalDateTime.now());

     pendingPasswordResetRepository.save(pending);
 }
 
// @Override
// public void resetPassword(ResetPasswordRequest request) {
//
////     boolean validOtp = otpService.verifyOtp(
////             request.getEmail(),
////             request.getOtp(),
////             OtpPurpose.FORGOT_PASSWORD
////     );
//
////     if (!validOtp) {
////         throw new RuntimeException("Invalid or expired OTP");
////     }
//
//     User user = userRepository.findByEmail(request.getEmail())
//             .orElseThrow(() ->
//                     new RuntimeException("User not found"));
//
//     user.setPassword(passwordEncoder.encode(request.getNewPassword()));
//
//     userRepository.save(user);
// }
 
 @Override
 @Transactional
 public void resetPassword(ResetPasswordRequest request) {

     // Check if the user has already verified the OTP
     PendingPasswordReset pending = pendingPasswordResetRepository
             .findByEmail(request.getEmail())
             .orElseThrow(() ->
                     new RuntimeException("OTP verification required"));

     // Find the user
     User user = userRepository.findByEmail(request.getEmail())
             .orElseThrow(() ->
                     new RuntimeException("User not found"));

     // Update password
     user.setPassword(passwordEncoder.encode(request.getNewPassword()));

     userRepository.save(user);

     // Remove the pending verification record
     pendingPasswordResetRepository.deleteByEmail(request.getEmail());
 }
 
 @Override
 @Transactional
 public void changePassword(ChangePasswordRequest request) {

     User user = userRepository.findByEmail(request.getEmail())
             .orElseThrow(() ->
                     new RuntimeException("User not found"));

     if (!passwordEncoder.matches(
             request.getCurrentPassword(),
             user.getPassword())) {

         throw new RuntimeException("Current password is incorrect");
     }

     pendingPasswordChangeRepository
             .deleteByEmail(request.getEmail());

     PendingPasswordChange pending = new PendingPasswordChange();

     pending.setEmail(request.getEmail());
     pending.setEncodedPassword(
             passwordEncoder.encode(request.getNewPassword()));
     pending.setCreatedAt(LocalDateTime.now());

     pendingPasswordChangeRepository.save(pending);

     otpService.generateOtp(
             request.getEmail(),
             OtpPurpose.CHANGE_PASSWORD
     );
 }
 
 
 @Override
 @Transactional
 public void verifyChangePassword(VerifyChangePasswordRequest request) {

     boolean validOtp = otpService.verifyOtp(
             request.getEmail(),
             request.getOtp(),
             OtpPurpose.CHANGE_PASSWORD
     );

     if (!validOtp) {
         throw new RuntimeException("Invalid or expired OTP");
     }

     PendingPasswordChange pending = pendingPasswordChangeRepository
             .findByEmail(request.getEmail())
             .orElseThrow(() ->
                     new RuntimeException("No pending password change found"));

     User user = userRepository.findByEmail(request.getEmail())
             .orElseThrow(() ->
                     new RuntimeException("User not found"));

     user.setPassword(pending.getEncodedPassword());

     userRepository.save(user);

     pendingPasswordChangeRepository.deleteByEmail(request.getEmail());
 }
 
 @Override
 @Transactional
 public void changeUsername(ChangeUsernameRequest request) {

     User user = userRepository.findByEmail(request.getEmail())
             .orElseThrow(() ->
                     new RuntimeException("User not found"));

     if (userRepository.existsByUsername(request.getNewUsername())) {
         throw new DuplicateUserException("Username already exists");
     }

     // Remove any previous pending request
     pendingUsernameChangeRepository.deleteByEmail(request.getEmail());

     PendingUsernameChange pending = new PendingUsernameChange();

     pending.setEmail(request.getEmail());
     pending.setNewUsername(request.getNewUsername());
     pending.setCreatedAt(LocalDateTime.now());

     pendingUsernameChangeRepository.save(pending);

     otpService.generateOtp(
             request.getEmail(),
             OtpPurpose.CHANGE_USERNAME
     );
 }
 
 @Override
 @Transactional
 public void verifyChangeUsername(VerifyChangeUsernameRequest request) {

     boolean validOtp = otpService.verifyOtp(
             request.getEmail(),
             request.getOtp(),
             OtpPurpose.CHANGE_USERNAME
     );

     if (!validOtp) {
         throw new RuntimeException("Invalid or expired OTP");
     }

     PendingUsernameChange pending = pendingUsernameChangeRepository
             .findByEmail(request.getEmail())
             .orElseThrow(() ->
                     new RuntimeException("No pending username change found"));

     User user = userRepository.findByEmail(request.getEmail())
             .orElseThrow(() ->
                     new RuntimeException("User not found"));

     user.setUsername(pending.getNewUsername());

     userRepository.save(user);

     pendingUsernameChangeRepository.deleteByEmail(request.getEmail());
 }
 
 
 @Override
 @Transactional
 public String loginRequest(LoginRequest request) {

     Authentication authentication = authenticationManager.authenticate(
             new UsernamePasswordAuthenticationToken(
                     request.getUsername(),
                     request.getPassword()));

     User user = userRepository.findByUsername(authentication.getName())
             .orElseThrow(() -> new RuntimeException("User not found"));

     pendingLoginRepository.deleteByEmail(user.getEmail());

     PendingLogin pending = new PendingLogin();

     pending.setEmail(user.getEmail());
     pending.setCreatedAt(LocalDateTime.now());

     pendingLoginRepository.save(pending);

     otpService.generateOtp(
             user.getEmail(),
             OtpPurpose.LOGIN
     );
     
  // Return email
     return user.getEmail();
 }
 
 @Override
 @Transactional
 public LoginResponse verifyLoginOtp(VerifyLoginOtpRequest request) {

     boolean validOtp = otpService.verifyOtp(
             request.getEmail(),
             request.getOtp(),
             OtpPurpose.LOGIN
     );

     if (!validOtp) {
         throw new RuntimeException("Invalid or expired OTP");
     }

     PendingLogin pending = pendingLoginRepository
             .findByEmail(request.getEmail())
             .orElseThrow(() ->
                     new RuntimeException("No pending login found"));

     User user = userRepository.findByEmail(request.getEmail())
             .orElseThrow(() ->
                     new RuntimeException("User not found"));

     UserDetails userDetails = org.springframework.security.core.userdetails.User
             .withUsername(user.getUsername())
             .password(user.getPassword())
             .authorities(user.getRole().name())
             .build();

     String accessToken = jwtService.generateToken(userDetails);

     RefreshToken refreshToken =
             refreshTokenService.createRefreshToken(user);

     pendingLoginRepository.deleteByEmail(request.getEmail());

     return LoginResponse.builder()
             .id(user.getId())
             .employeeId(user.getEmployeeId())
             .fullName(user.getFullName())
             .username(user.getUsername())
             .email(user.getEmail())
             .role(user.getRole())
             .accessToken(accessToken)
             .refreshToken(refreshToken.getToken())
             .build();
 }
 
 @Override
 @Transactional
 public void resendOtp(ResendOtpRequest request) {

//     otpService.generateOtp(
//             request.getEmail(),
//             request.getPurpose()
//     );
	 
	 otpService.resendOtp(
		        request.getEmail(),
		        request.getPurpose()
		);
 }
 
 
 @Override
 public RefreshTokenResponse refreshToken(
         RefreshTokenRequest request) {

     RefreshToken refreshToken = refreshTokenService
             .verifyRefreshToken(request.getRefreshToken());

     User user = refreshToken.getUser();

     UserDetails userDetails =
             org.springframework.security.core.userdetails.User
                     .withUsername(user.getUsername())
                     .password(user.getPassword())
                     .authorities(user.getRole().name())
                     .build();

     String accessToken = jwtService.generateToken(userDetails);

     return new RefreshTokenResponse(accessToken);
 }
}