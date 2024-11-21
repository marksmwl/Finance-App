package com.example.Financial_Project.controller;

import com.example.Financial_Project.DTO.CategoryBudgetUpdateDTO;
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

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@Validated
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
public class CategoryController {
    private final CategoryService categoryService;
    private final UserService userService;

    @Autowired
    public CategoryController(CategoryService categoryService, UserService userService) {
        this.categoryService = categoryService;
        this.userService = userService;
    }

    @PostMapping("/addCategory")
    public ResponseEntity<Long> addCategory(@Valid @RequestBody CategoryDTO category) {
        Optional<User> userOptional = userService.findById(category.getUserId());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        else {
            Long newId = categoryService.addCategoryToUser(userOptional.get(), category);
            return ResponseEntity.status(HttpStatus.OK).body(newId);
        }
    }

    @GetMapping("/{userId}/getCategories")
    public ResponseEntity<List<Category>> getCategories(@PathVariable Long userId) {
        Optional<User> userOptional = userService.findById(userId);
        if (userOptional.isEmpty()) {
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.getCategoriesForUser(userId));
    }

    @PutMapping("/{categoryId}/changeName")
    public ResponseEntity<String> changeName(@PathVariable Long categoryId, @Valid @RequestBody CategoryDTO categoryDTO) {
        Optional<Category> categoryOptional = categoryService.findById(categoryId);
        if (categoryOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category does not exist.");
        }
        Category category = categoryOptional.get();
        categoryService.updateName(category, categoryDTO);
        return ResponseEntity.status(HttpStatus.OK).body("Category name has been changed.");
    }

    @PutMapping("/updateBudget")
    public ResponseEntity<String> updateBudget(@PathVariable Long categoryId, @Valid @RequestBody CategoryBudgetUpdateDTO categoryDTO) {
        Optional<Category> categoryOptional = categoryService.findById(categoryId);
        if (categoryOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category does not exist.");
        }
        Category category = categoryOptional.get();
        categoryService.updateBudget(category, categoryDTO.getBudget());
        return ResponseEntity.status(HttpStatus.OK).body("Category budget has been changed.");
    }

    @DeleteMapping("deleteCategory/{categoryId}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long categoryId) {
        Optional<Category> categoryOptional = categoryService.findById(categoryId);
        if (categoryOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category does not exist.");
        }
        else {
            categoryService.deleteById(categoryId);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Category was deleted");
        }
    }


}
