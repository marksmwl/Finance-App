package com.example.Financial_Project.controller;

import com.example.Financial_Project.model.Category;
import com.example.Financial_Project.model.User;
import com.example.Financial_Project.repository.UserRepository;
import com.example.Financial_Project.service.CategoryService;
import com.example.Financial_Project.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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

//    @PostMapping("/{userID}/addCategory")
//    public ResponseEntity<String> addCategory(@PathVariable Long userID, @Valid @RequestBody Category category) {
//        Optional<User> userOptional = userService.findById(userID);
//        if (userOptional.isPresent()) {
//            User user = userOptional.get();
//            category.setUser(user);
//            categoryService.addCategory(category.getUser(), category.getName());
//            return ResponseEntity.ok("Category added successfully.");
//        } else {
//            return ResponseEntity.status(404).body("User not found.");
//        }
//    }

}
