package com.example.Financial_Project.controller;

import com.example.Financial_Project.DTO.ExpenseDTO;
import com.example.Financial_Project.model.Category;
import com.example.Financial_Project.model.Expense;
import com.example.Financial_Project.service.CategoryService;
import com.example.Financial_Project.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class ExpenseController {
    private final ExpenseService expenseService;
    private final CategoryService categoryService;

    @Autowired
    public ExpenseController(ExpenseService expenseService, CategoryService categoryService) {
        this.expenseService = expenseService;
        this.categoryService = categoryService;
    }

    @PostMapping("/addExpense")
    public ResponseEntity<String> addExpense(@Validated @RequestBody ExpenseDTO expenseDTO) {
        Optional<Category> categoryOptional = categoryService.findById(expenseDTO.getCategoryId());
        if (categoryOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category does not exist.");
        }
        expenseService.addExpense(categoryOptional.get(), expenseDTO);
        return ResponseEntity.status(HttpStatus.OK).body("Expense has been added.");
    }

    @PutMapping("/{expenseId}/update")
    public ResponseEntity<String> updateExpense(@PathVariable Long expenseId, @Valid ExpenseDTO expenseDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body("Expense has been updated.");
    }

    @DeleteMapping("{expenseId}")
    public ResponseEntity<String> deleteExpense(@PathVariable Long Id) {
        Optional<Expense> expenseOptional = expenseService.findById(Id);
        if (expenseOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Expense does not exist.");
        }
        expenseService.deleteExpense(Id);
        return ResponseEntity.status(HttpStatus.OK).body("Expense has been deleted");
    }

}
