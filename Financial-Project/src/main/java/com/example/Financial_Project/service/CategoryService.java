package com.example.Financial_Project.service;

import com.example.Financial_Project.DTO.CategoryDTO;
import com.example.Financial_Project.model.Category;
import com.example.Financial_Project.model.User;
import com.example.Financial_Project.repository.CategoryRepository;
import com.example.Financial_Project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getCategoriesForUser(Long userId) {
        return categoryRepository.findByUserId(userId);
    }

    public Optional<Category> findById(Long Id) {
        return categoryRepository.findById(Id);
    }

    public Long addCategoryToUser(User user, CategoryDTO category) {
        Category newCategory = new Category();
        newCategory.setName(category.getName());
        newCategory.setUser(user);
        newCategory.setBudget(category.getBudget());

        return categoryRepository.save(newCategory).getId();
    }

    public void updateBudget(Category category, Double newBudget) {
        category.setBudget(newBudget);
        categoryRepository.save(category);
    }

    public void updateName(Category category, CategoryDTO categoryDTO) {
       category.setName(categoryDTO.getName());
       categoryRepository.save(category);
    }

    public void deleteById(Long Id) {
        categoryRepository.deleteById(Id);
    }
}
