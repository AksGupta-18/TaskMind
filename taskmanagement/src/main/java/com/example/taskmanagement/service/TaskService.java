package com.example.taskmanagement.service;

import com.example.taskmanagement.entity.Task;
import com.example.taskmanagement.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final AiPriorityService aiPriorityService;

    public TaskService(TaskRepository taskRepository, AiPriorityService aiPriorityService) {
        this.taskRepository = taskRepository;
        this.aiPriorityService = aiPriorityService;
    }

    public Task createTask(Task task) {
        String priority = aiPriorityService.determinePriority(
                task.getTitle(),
                task.getDescription(),
                task.getDueDate()
        );

        task.setPriority(priority);
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public List<Task> getByStatus(String status) {
        return taskRepository.findByStatus(status);
    }

    public List<Task> getByPriority(String priority) {
        return taskRepository.findByPriority(priority);
    }

    public Task markCompleted(Long id) {
        Optional<Task> optionalTask = taskRepository.findById(id);

        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setStatus("COMPLETED");
            return taskRepository.save(task);
        }

        return null;
    }

    public Task updateTask(Long id, Task updatedTask) {
        Optional<Task> optionalTask = taskRepository.findById(id);

        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            
            // Update fields
            if (updatedTask.getTitle() != null) {
                task.setTitle(updatedTask.getTitle());
            }
            if (updatedTask.getDescription() != null) {
                task.setDescription(updatedTask.getDescription());
            }
            if (updatedTask.getDueDate() != null) {
                task.setDueDate(updatedTask.getDueDate());
            }
            if (updatedTask.getStatus() != null) {
                task.setStatus(updatedTask.getStatus());
            }

            // Recalculate priority based on updated values
            String priority = aiPriorityService.determinePriority(
                    task.getTitle(),
                    task.getDescription(),
                    task.getDueDate()
            );
            task.setPriority(priority);

            return taskRepository.save(task);
        }

        return null;
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}