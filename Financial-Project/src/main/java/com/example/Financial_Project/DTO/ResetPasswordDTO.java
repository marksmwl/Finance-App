package com.example.Financial_Project.DTO;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ResetPasswordDTO {

    @NotNull(message = "A new password is required.")
    @Size(min = 3, message = "Password must be at least 3 characters.")
    private String newPassword;

    public String getNewPassword() {
        return newPassword;
    }
}
