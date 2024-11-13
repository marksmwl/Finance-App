package com.example.Financial_Project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "category")
public class Category {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @NotNull
        private String name;

        @JsonIgnore
        @ManyToOne
        @JoinColumn(name = "user_id", nullable = false)
        private User user;

        @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
        private final List<Expense> expenses = new ArrayList<>();

        public Long getId() {
                return id;
        }

        public void setId(Long id) {
                this.id = id;
        }

        public User getUser() {
                return user;
        }

        public void setUser(User user) {
                this.user = user;
        }

        public String getName() {
                return name;
        }

        public void setName(String name) {
                this.name = name;
        }

        public List<Expense> getExpenses() {
                return expenses;
        }

        public void addExpense(Expense expense) {
                this.expenses.add(expense);
                expense.setCategory(this);
        }

        public boolean removeExpense(Expense expense) {
                boolean result = this.expenses.remove(expense);
                expense.setCategory(null);
                return result;
        }
}
