package com.example.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.entities.User;
import com.example.backend.entities.otp.PendingRegistration;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	//To prevent duplicate usernames,emails,phone numbers and EmployeeId
	boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
    boolean existsByEmployeeId(String employeeId);
    
    //To find user by username for login
    Optional<User> findByUsername(String username);
    
    Optional<User> findByEmail(String email);
    
    
}
