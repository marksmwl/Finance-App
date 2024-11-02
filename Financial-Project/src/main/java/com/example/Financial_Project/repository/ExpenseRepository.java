package com.example.Financial_Project.repository;

import com.example.Financial_Project.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}
