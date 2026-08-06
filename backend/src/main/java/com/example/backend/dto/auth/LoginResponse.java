package com.example.backend.dto.auth;

import com.example.backend.enums.Role;

public class LoginResponse {

    private Long id;
    private String employeeId;
    private String fullName;
    private String username;
    private String email;
    private Role role;
    private String accessToken;
    private String refreshToken;

    public LoginResponse(Long id, String employeeId, String fullName, String username,
                          String email, Role role, String accessToken, String refreshToken) {
        this.id = id;
        this.employeeId = employeeId;
        this.fullName = fullName;
        this.username = username;
        this.email = email;
        this.role = role;
       this.setAccessToken(accessToken);
		this.setRefreshToken(refreshToken);
    }

    public Long getId() {
        return id;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public String getFullName() {
        return fullName;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public Role getRole() {
        return role;
    }

    

    public static Builder builder() {
        return new Builder();
    }

    public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public String getRefreshToken() {
		return refreshToken;
	}

	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}

	public static class Builder {

	    private Long id;
	    private String employeeId;
	    private String fullName;
	    private String username;
	    private String email;
	    private Role role;
	    private String accessToken;
	    private String refreshToken;

	    public Builder id(Long id) {
	        this.id = id;
	        return this;
	    }

	    public Builder employeeId(String employeeId) {
	        this.employeeId = employeeId;
	        return this;
	    }

	    public Builder fullName(String fullName) {
	        this.fullName = fullName;
	        return this;
	    }

	    public Builder username(String username) {
	        this.username = username;
	        return this;
	    }

	    public Builder email(String email) {
	        this.email = email;
	        return this;
	    }

	    public Builder role(Role role) {
	        this.role = role;
	        return this;
	    }

	    public Builder accessToken(String accessToken) {
	        this.accessToken = accessToken;
	        return this;
	    }

	    public Builder refreshToken(String refreshToken) {
	        this.refreshToken = refreshToken;
	        return this;
	    }

	    public LoginResponse build() {
	        return new LoginResponse(
	                id,
	                employeeId,
	                fullName,
	                username,
	                email,
	                role,
	                accessToken,
	                refreshToken
	        );
	    }
	}
}