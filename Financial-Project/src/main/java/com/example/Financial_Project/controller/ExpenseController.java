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
@CrossOrigin(
        origins = {
                "*",
        },
        methods = {
                RequestMethod.OPTIONS,
                RequestMethod.GET,
                RequestMethod.PUT,
                RequestMethod.DELETE,
                RequestMethod.POST
        })
public class ExpenseController {
    private final ExpenseService expenseService;
    private final CategoryService categoryService;

    @Autowired
    public ExpenseController(ExpenseService expenseService, CategoryService categoryService) {
        this.expenseService = expenseService;
        this.categoryService = categoryService;
    }

    @PostMapping("/addExpense")
    public ResponseEntity<Long> addExpense(@Validated @RequestBody ExpenseDTO expenseDTO) {
        Optional<Category> categoryOptional = categoryService.findById(expenseDTO.getCategoryId());
        if (categoryOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        Long expenseId = expenseService.addExpense(categoryOptional.get(), expenseDTO);
        return ResponseEntity.status(HttpStatus.OK).body(expenseId);
    }


    @PutMapping("/{expenseId}/update")
    public ResponseEntity<String> updateExpense(@PathVariable Long expenseId, @Valid ExpenseDTO expenseDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body("Expense has been updated.");
    }

    @DeleteMapping("/deleteExpense/{expenseId}")
    public ResponseEntity<String> deleteExpense(@PathVariable Long expenseId) {
        Optional<Expense> expenseOptional = expenseService.findById(expenseId);
        if (expenseOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Expense does not exist.");
        }
        expenseService.deleteExpense(expenseId);
        return ResponseEntity.status(HttpStatus.OK).body("Expense has been deleted");
    }

}
