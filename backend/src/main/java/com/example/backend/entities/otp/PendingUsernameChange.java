package com.example.backend.entities.otp;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "pending_username_changes")
public class PendingUsernameChange {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String newUsername;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public PendingUsernameChange() {
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getNewUsername() {
        return newUsername;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setNewUsername(String newUsername) {
        this.newUsername = newUsername;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}