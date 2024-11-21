package com.example.Financial_Project.DTO;

import jakarta.validation.constraints.NotNull;

public class UserDTO {
    @NotNull
    private String name;

    @NotNull
    private String email;

    public @NotNull String getName() {
        return name;
    }

    public @NotNull String getEmail() {
        return email;
    }

    public Double getSavings() {
        return savings;
    }

    public Double getBudget() {
        return budget;
    }

    public Long getUserId() {
        return userId;
    }

    private Double savings;

    private Double budget;

    private Long userId;

    public void setName(@NotNull String name) {
        this.name = name;
    }

    public void setEmail(@NotNull String email) {
        this.email = email;
    }

    public void setSavings(Double savings) {
        this.savings = savings;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
