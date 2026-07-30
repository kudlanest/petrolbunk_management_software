package com.example.backend.exceptions.User;

public class DuplicateUserException extends RuntimeException {

	public DuplicateUserException(String message) {
        super(message);
    }
	
}
