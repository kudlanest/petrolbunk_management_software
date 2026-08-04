package com.example.backend.dto.auth;

import com.example.backend.enums.Role;

public class LoginResponse {

    private Long id;
    private String employeeId;
    private String fullName;
    private String username;
    private String email;
    private Role role;
    private String token;

    public LoginResponse(Long id, String employeeId, String fullName, String username,
                          String email, Role role, String token) {
        this.id = id;
        this.employeeId = employeeId;
        this.fullName = fullName;
        this.username = username;
        this.email = email;
        this.role = role;
        this.token = token;
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

    public String getToken() {
        return token;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String employeeId;
        private String fullName;
        private String username;
        private String email;
        private Role role;
        private String token;

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

        public Builder token(String token) {
            this.token = token;
            return this;
        }

        public LoginResponse build() {
            return new LoginResponse(id, employeeId, fullName, username, email, role, token);
        }
    }
}