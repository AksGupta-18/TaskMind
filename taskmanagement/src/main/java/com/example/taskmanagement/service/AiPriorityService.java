package com.example.taskmanagement.service;

import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Service
public class AiPriorityService {

    public String determinePriority(String title, String description, LocalDate dueDate) {

        String text = (title + " " + description).toLowerCase();

        // Keyword-based logic
        if (text.contains("urgent") || text.contains("exam") || text.contains("submit")) {
            return "HIGH";
        }

        // Due date based logic
        if (dueDate != null) {
            long daysLeft = ChronoUnit.DAYS.between(LocalDate.now(), dueDate);

            if (daysLeft <= 2) {
                return "HIGH";
            } else if (daysLeft <= 5) {
                return "MEDIUM";
            }
        }

        return "LOW";
    }
}