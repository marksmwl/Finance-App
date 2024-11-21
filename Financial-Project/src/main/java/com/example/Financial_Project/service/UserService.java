package com.example.Financial_Project.service;

import com.example.Financial_Project.model.User;
import com.example.Financial_Project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        // hash the password here before saving (e.g., with BCryptPasswordEncoder)
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) { return userRepository.findByEmail(email);}

    public Optional<User> findById(Long Id) {
        return userRepository.findById(Id);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    public void updateBudget(double amount, User user) {
        user.setBudget(amount);
        userRepository.save(user);
    }

    public void updateSavingsGoal(Double amount, User user) {
        user.setSavingsGoal(amount);
        userRepository.save(user);
    }

    public void updatePassword(Long userId, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        // hash the new password before saving
        user.setPassword(newPassword);
        userRepository.save(user);
    }

}