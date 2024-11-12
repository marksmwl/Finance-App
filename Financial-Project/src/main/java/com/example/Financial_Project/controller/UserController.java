package com.example.Financial_Project.controller;

import com.example.Financial_Project.model.User;
import com.example.Financial_Project.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody User user) {
        User registeredUser = userService.registerUser(user.getUsername(), user.getEmail(), user.getPassword());
        return new ResponseEntity<>("User registered successfully: " + registeredUser.getUsername(), HttpStatus.CREATED);
    }

    // Add login endpoint for JWT authentication later
}
