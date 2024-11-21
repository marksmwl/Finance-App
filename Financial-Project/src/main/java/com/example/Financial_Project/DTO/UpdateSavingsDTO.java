package com.example.Financial_Project.DTO;

import jakarta.validation.constraints.NotNull;

public class UpdateSavingsDTO {
    @NotNull
    private Double amount;

    public @NotNull Double getAmount() {
        return amount;
    }
}
