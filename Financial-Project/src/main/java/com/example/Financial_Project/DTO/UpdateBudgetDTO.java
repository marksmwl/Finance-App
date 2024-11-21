package com.example.Financial_Project.DTO;

import jakarta.validation.constraints.NotNull;

public class UpdateBudgetDTO {
    @NotNull
    private Double budget;

    public @NotNull Double getBudget() {
        return budget;
    }
}
