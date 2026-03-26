import React, { useState, useEffect } from 'react';
import { TaskItem } from './TaskItem';

export function TaskList({ tasks, onTasksUpdated, filter = 'all', searchQuery = '' }) {
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [sortBy, setSortBy] = useState('createdAt');

  useEffect(() => {
    let filtered = [...tasks];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(query) || 
        (t.description && t.description.toLowerCase().includes(query))
      );
    }

    // Apply status filter
    if (filter === 'active') {
      filtered = filtered.filter(t => t.status === 'PENDING');
    } else if (filter === 'completed') {
      filtered = filtered.filter(t => t.status === 'COMPLETED');
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    setFilteredTasks(filtered);
  }, [tasks, filter, sortBy, searchQuery]);

  const handleTaskUpdated = (updatedTask) => {
    if (updatedTask === null) {
      // Task was deleted
      const updatedTasks = tasks.filter(t => t !== updatedTask);
      if (onTasksUpdated) onTasksUpdated(updatedTasks);
    } else {
      // Task was updated
      const updatedTasks = tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
      if (onTasksUpdated) onTasksUpdated(updatedTasks);
    }
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'COMPLETED').length,
    active: tasks.filter(t => t.status === 'PENDING').length,
    high: tasks.filter(t => t.priority === 'HIGH').length,
  };

  return (
    <div>
      {/* Compact Stats Bar - Optional */}
      {tasks.length > 0 && (
        <div className="mb-6 flex gap-4 text-sm text-gray-600 flex-wrap">
          <span>📊 {tasks.length} total</span>
          <span>⚡ {tasks.filter(t => t.status === 'PENDING').length} active</span>
          <span>✅ {tasks.filter(t => t.status === 'COMPLETED').length} completed</span>
          <span>🔴 {tasks.filter(t => t.priority === 'HIGH').length} high priority</span>
        </div>
      )}

      {/* Sorting Controls */}
      <div className="mb-6 flex gap-3 items-center">
        <label className="text-sm font-medium text-gray-600">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="createdAt">📅 Newest First</option>
          <option value="priority">🔴 Priority</option>
          <option value="dueDate">⏰ Due Date</option>
        </select>
      </div>

      {/* Tasks List */}
      {filteredTasks.length === 0 ? (
        <div className="p-12 text-center rounded-lg border border-gray-200 bg-gray-50">
          <div className="text-5xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {filter === 'completed' ? 'No completed tasks yet!' : 'No tasks to show!'}
          </h3>
          <p className="text-gray-500 text-sm">
            {filter === 'all' && 'Create a new task to get started.'}
            {filter === 'active' && 'All tasks are completed! Great job! 🚀'}
            {filter === 'completed' && 'Complete some tasks to see them here.'}
          </p>
        </div>
      ) : (
        <div className="animate-fade-in">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onTaskUpdated={handleTaskUpdated}
            />
          ))}
        </div>
      )}
    </div>
  );
}
