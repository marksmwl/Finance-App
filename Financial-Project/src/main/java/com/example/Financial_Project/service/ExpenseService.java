package com.example.Financial_Project.service;

import com.example.Financial_Project.DTO.ExpenseDTO;
import com.example.Financial_Project.model.Category;
import com.example.Financial_Project.model.Expense;
import com.example.Financial_Project.repository.CategoryRepository;
import com.example.Financial_Project.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {
    private final ExpenseRepository expenseRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public ExpenseService(CategoryRepository categoryRepository, ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
        this.categoryRepository = categoryRepository;
    }

    public void addExpense(Category category, ExpenseDTO expenseDTO) {
       Expense expense = new Expense();
       expense.setCategory(category);
       expense.setAmount(expenseDTO.getAmount());
       expense.setDescription(expenseDTO.getDescription());
       category.addExpense(expense);

       expenseRepository.save(expense);
       categoryRepository.save(category);
    }

    // Retrieve all expenses for a specific category
    public List<Expense> getExpensesByCategory(Long categoryId) {
        return expenseRepository.findByCategoryId(categoryId);
    }

    // Update an expense by ID
    public Expense updateExpense(Long expenseId, String newDescription, BigDecimal newAmount, LocalDate newDate) {
        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        expense.setDescription(newDescription);
        expense.setAmount(newAmount);
        expense.setDate(newDate);
        return expenseRepository.save(expense);
    }

    public Optional<Expense> findById(Long Id) {
       return expenseRepository.findById(Id);
    }

    // Delete an expense by ID
    public void deleteExpense(Long expenseId) {
        if (!expenseRepository.existsById(expenseId)) {
            throw new RuntimeException("Expense not found");
        }
        expenseRepository.deleteById(expenseId);
    }
}
