package com.example.Financial_Project.repository;

import com.example.Financial_Project.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
