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

    public Category addCategoryToUser(User user, CategoryDTO category) {
        Category newCategory = new Category();
        newCategory.setName(category.getName());
        newCategory.setUser(user);
        return categoryRepository.save(newCategory);
    }

    public void deleteById(Long Id) {
        categoryRepository.deleteById(Id);
    }
}
