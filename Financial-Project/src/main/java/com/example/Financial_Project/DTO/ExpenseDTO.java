package com.example.Financial_Project.DTO;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public class ExpenseDTO {
    @NotNull
    private String description;

    @NotNull
    @Positive
    private BigDecimal amount;


    @NotNull
    private Long categoryId;

    public String getDescription() {
        return description;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public Long getCategoryId() {
        return categoryId;
    }
}
