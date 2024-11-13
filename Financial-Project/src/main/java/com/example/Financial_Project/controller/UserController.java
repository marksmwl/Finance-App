package com.example.Financial_Project.controller;

import com.example.Financial_Project.DTO.LoginDTO;
import com.example.Financial_Project.DTO.ResetPasswordDTO;
import com.example.Financial_Project.model.User;
import com.example.Financial_Project.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody User user) {
        Optional<User> userOptional = userService.findByEmail(user.getEmail());
        if (userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User with email already exists.");
        }
        User createdUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User created.");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginDTO loginDTO) {
        Optional<User> user = userService.findByUsername(loginDTO.getUsername());
        if (user.isPresent() && passwordMatches(loginDTO.getPassword(), user.get().getPassword())) {
            // generate a JWT or session token if using Spring Security
            return ResponseEntity.ok("Login successful!");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        Optional<User> userOptional = userService.findById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User does not exist.");
        }
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully");
    }

    @PutMapping("/{userId}/password")
    public ResponseEntity<String> updatePassword(@PathVariable Long userId, @Valid @RequestBody ResetPasswordDTO newPassword) {

        Optional<User> userOptional = userService.findById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User does not exist.");
        }
        userService.updatePassword(userId, newPassword.getNewPassword());
        return ResponseEntity.ok("Password updated successfully");
    }

    private boolean passwordMatches(String rawPassword, String hashedPassword) {
        return Objects.equals(rawPassword, hashedPassword);
    }
}
