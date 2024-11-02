package com.example.Financial_Project.model;

import jakarta.persistence.*;

@Entity
@Table(name = "category")
public class Category {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String name;

}
