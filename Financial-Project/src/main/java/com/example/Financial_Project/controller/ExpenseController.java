package com.example.Financial_Project.controller;

import com.example.Financial_Project.model.Expense;
import com.example.Financial_Project.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class ExpenseController {
    private final ExpenseService expenseService;

    @Autowired
    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping("/addExpense")
    public Expense addExpense(@Validated @RequestBody Expense expense) {

        return expense;
    }

    @DeleteMapping("{expenseId}")
    public ResponseEntity<String> deleteExpense(@PathVariable Long Id) {

        return ResponseEntity.status(HttpStatus.OK).body("Expense has been deleted");
    }

}
