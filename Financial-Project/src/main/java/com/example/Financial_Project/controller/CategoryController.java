package com.example.Financial_Project.controller;

import com.example.Financial_Project.DTO.CategoryDTO;
import com.example.Financial_Project.model.Category;
import com.example.Financial_Project.model.User;
import com.example.Financial_Project.repository.UserRepository;
import com.example.Financial_Project.service.CategoryService;
import com.example.Financial_Project.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@Validated
public class CategoryController {
    private final CategoryService categoryService;
    private final UserService userService;

    @Autowired
    public CategoryController(CategoryService categoryService, UserService userService) {
        this.categoryService = categoryService;
        this.userService = userService;
    }

    @PostMapping("/addCategory")
    public ResponseEntity<String> addCategory(@Valid @RequestBody CategoryDTO category) {
        Optional<User> userOptional = userService.findById(category.getUserId());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Provide a valid userId");
        }
        else {
            categoryService.addCategoryToUser(userOptional.get(), category);
            return ResponseEntity.status(HttpStatus.OK).body("Category added");
        }
    }

    @DeleteMapping("{categoryId}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long Id) {
        Optional<Category> categoryOptional = categoryService.findById(Id);
        if (categoryOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category does not exist.");
        }
        else {
            categoryService.deleteById(Id);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Category was deleted");
        }
    }


}
