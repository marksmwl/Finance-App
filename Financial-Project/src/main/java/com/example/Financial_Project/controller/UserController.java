package com.example.Financial_Project.controller;

import com.example.Financial_Project.DTO.*;
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
    public ResponseEntity<Long> loginUser(@RequestBody LoginDTO loginDTO) {
        Optional<User> user = userService.findByUsername(loginDTO.getUsername());
        if (user.isPresent() && passwordMatches(loginDTO.getPassword(), user.get().getPassword())) {
            // generate a JWT or session token if using Spring Security
            return ResponseEntity.ok(user.get().getId());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }

    @DeleteMapping("deleteUser/{userId}")
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

    @GetMapping("/user/{userId}")
    public ResponseEntity<UserDTO> getUserInfo(@PathVariable Long userId) {
        Optional<User> userOptional = userService.findById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        User user = userOptional.get();
        UserDTO userResponse = new UserDTO();
        userResponse.setEmail(user.getEmail());
        userResponse.setName(user.getUsername());
        userResponse.setBudget(user.getBudget());
        userResponse.setSavings(user.getSavingsGoal());
        userResponse.setUserId(user.getId());
        return ResponseEntity.ok(userResponse);
    }

    @PutMapping("/{userId}/savings")
    public ResponseEntity<String> updateSavings(@PathVariable Long userId, @Valid @RequestBody UpdateSavingsDTO savingsDTO) {

        Optional<User> userOptional = userService.findById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User does not exist.");
        }
        userService.updateSavingsGoal(savingsDTO.getAmount(), userOptional.get());
        return ResponseEntity.ok("Savings goal updated successfully");
    }

    @PutMapping("/{userId}/budget")
    public ResponseEntity<String> updatePassword(@PathVariable Long userId, @Valid @RequestBody UpdateBudgetDTO budgetDTO) {

        Optional<User> userOptional = userService.findById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User does not exist.");
        }
        userService.updateBudget(budgetDTO.getBudget(), userOptional.get());
        return ResponseEntity.ok("Savings goal updated successfully");
    }

    private boolean passwordMatches(String rawPassword, String hashedPassword) {
        return Objects.equals(rawPassword, hashedPassword);
    }
}
