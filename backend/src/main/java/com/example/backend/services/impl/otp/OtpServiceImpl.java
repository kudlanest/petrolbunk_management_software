package com.example.backend.services.impl.otp;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.entities.otp.OtpVerification;
import com.example.backend.enums.OtpPurpose;
import com.example.backend.repositories.otp.OtpRepository;
import com.example.backend.services.email.EmailService;
import com.example.backend.services.otp.OtpService;

@Service
public class OtpServiceImpl implements OtpService {

    private final OtpRepository otpRepository;
    private final EmailService emailService;

    public OtpServiceImpl(OtpRepository otpRepository,
                          EmailService emailService) {
        this.otpRepository = otpRepository;
        this.emailService = emailService;
    }

    @Override
    @Transactional
    public void generateOtp(String email, OtpPurpose purpose) {
    	
    	otpRepository.deleteByEmailAndPurpose(email, purpose);

        String otp = String.format("%06d", new Random().nextInt(999999));

        OtpVerification otpVerification = new OtpVerification();

        otpVerification.setEmail(email);
        otpVerification.setOtp(otp);
        otpVerification.setPurpose(purpose);
        otpVerification.setCreatedAt(LocalDateTime.now());
        otpVerification.setExpiresAt(LocalDateTime.now().plusMinutes(5));
        otpVerification.setVerified(false);

        otpRepository.save(otpVerification);

        emailService.sendOtpEmail(email, otp);
    }

    @Override
    public boolean verifyOtp(String email, String otp, OtpPurpose purpose) {
    	
//        System.out.println("Entered Email   : " + email);
//        System.out.println("Entered OTP     : '" + otp + "'");
//        System.out.println("Purpose         : " + purpose);



        OtpVerification otpVerification = otpRepository
                .findTopByEmailAndPurposeOrderByCreatedAtDesc(email, purpose)
                .orElse(null);
        
//        System.out.println("DB OTP          : '" + otpVerification.getOtp() + "'");
//        System.out.println("Verified        : " + otpVerification.isVerified());
//        System.out.println("Expires At      : " + otpVerification.getExpiresAt());
//        System.out.println("Current Time    : " + LocalDateTime.now());

        if (otpVerification == null) {
            return false;
        }

        if (!otpVerification.getOtp().equals(otp)) {
            return false;
        }
//        System.out.println("OTP Match: " + otpVerification.getOtp().equals(otp));
//
//        if (!otpVerification.getOtp().trim().equals(otp.trim())) {
//            return false;
//        }
        if (otpVerification.isVerified()) {
            return false;
        }

        if (otpVerification.getExpiresAt().isBefore(LocalDateTime.now())) {
            return false;
        }
        
        
 

        otpVerification.setVerified(true);
        otpRepository.save(otpVerification);

        return true;
    }
}
