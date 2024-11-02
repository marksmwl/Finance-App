package com.example.Financial_Project.service;

import com.example.Financial_Project.model.Category;
import com.example.Financial_Project.model.Expense;
import com.example.Financial_Project.repository.CategoryRepository;
import com.example.Financial_Project.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class ExpenseService {
    private final ExpenseRepository expenseRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public ExpenseService(CategoryRepository categoryRepository, ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
        this.categoryRepository = categoryRepository;
    }

    public Expense addExpense(Category category, String description, BigDecimal amount) {
       Expense expense = new Expense();
       expense.setCategory(category);
       expense.setAmount(amount);
       expense.setDescription(description);
       category.addExpense(expense);
       return expenseRepository.save(expense);
    }
}
