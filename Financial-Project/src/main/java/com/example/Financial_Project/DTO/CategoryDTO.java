package com.example.Financial_Project.DTO;

import jakarta.validation.constraints.NotNull;

public class CategoryDTO {
    @NotNull
    private String name;

    @NotNull
    private Long userId;

    public String getName() {
        return name;
    }

    public Long getUserId() {
        return userId;
    }
}
