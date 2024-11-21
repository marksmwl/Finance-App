package com.example.Financial_Project.DTO;

import jakarta.validation.constraints.NotNull;

public class CategoryBudgetUpdateDTO {
    @NotNull
    private Double budget;

    public Double getBudget() {
        return budget;
    }
}
