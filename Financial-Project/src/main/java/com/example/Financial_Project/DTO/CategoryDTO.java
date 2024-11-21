package com.example.Financial_Project.DTO;

import jakarta.validation.constraints.NotNull;

public class CategoryDTO {
    @NotNull
    private String name;

    @NotNull
    private Long userId;

    @NotNull
    private Double budget;

    public String getName() {
        return name;
    }

    public Long getUserId() {
        return userId;
    }

    public @NotNull Double getBudget() {
        return budget;
    }
}
