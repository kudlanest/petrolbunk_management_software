package com.example.backend.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entities.User;
import com.example.backend.services.UserService;


@CrossOrigin(origins = "http://localhost:5173") 
@RestController
public class UserController {
	
	
	// Dependency injection of UserService using constructor injection
	private final UserService userService;
    public UserController(UserService userService){
        this.userService = userService;
    }
    
    @PostMapping("/createuser") 
	public User createUser(@RequestBody User user) {
       return userService.createUser(user);
       
	}
    

}
