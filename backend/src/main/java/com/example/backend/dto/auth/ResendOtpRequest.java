package com.example.backend.dto.auth;

import com.example.backend.enums.OtpPurpose;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public class ResendOtpRequest {

    @Email
    private String email;

    @NotNull
    private OtpPurpose purpose;

    public ResendOtpRequest() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public OtpPurpose getPurpose() {
        return purpose;
    }

    public void setPurpose(OtpPurpose purpose) {
        this.purpose = purpose;
    }
}