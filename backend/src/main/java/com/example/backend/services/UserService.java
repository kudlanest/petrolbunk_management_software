package com.example.backend.services;

import org.springframework.stereotype.Service;

import com.example.backend.entities.User;
import com.example.backend.repositories.UserRepository;

@Service

public class UserService {
	
	
	// Dependency injection of UserRepository using constructor injection
	private final UserRepository userRepository;
	public UserService(UserRepository userRepository){
		this.userRepository = userRepository;
	}
	
	
	public User createUser(User user) {
		return userRepository.save(user);
	}

}
