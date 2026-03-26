import React, { useState } from 'react';
import { taskService } from '../services/taskService';

export function TaskItem({ task, onTaskUpdated }) {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isCompleting, setIsCompleting] = React.useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate || '');
  const [isSaving, setIsSaving] = useState(false);
  const [showCompleteConfirm, setShowCompleteConfirm] = useState(false);
  const [showUnmarkConfirm, setShowUnmarkConfirm] = useState(false);

  const handleCompleteClick = () => {
    const isCompleted = task.status === 'COMPLETED';
    
    if (isCompleted) {
      // If already completed, show unmark confirmation dialog
      setShowUnmarkConfirm(true);
    } else {
      // If pending, show completion confirmation dialog
      setShowCompleteConfirm(true);
    }
  };

  const confirmUnmark = async () => {
    setShowUnmarkConfirm(false);
    setIsCompleting(true);
    try {
      const updatedTask = {
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        status: 'PENDING',
      };
      const updated = await taskService.updateTask(task.id, updatedTask);
      if (onTaskUpdated) {
        onTaskUpdated(updated);
      }
    } catch (error) {
      console.error('Error unmarking task:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  const handleUnmark = async () => {
    setIsCompleting(true);
    try {
      const updatedTask = {
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        status: 'PENDING',
      };
      const updated = await taskService.updateTask(task.id, updatedTask);
      if (onTaskUpdated) {
        onTaskUpdated(updated);
      }
    } catch (error) {
      console.error('Error unmarking task:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  const confirmComplete = async () => {
    setShowCompleteConfirm(false);
    setIsCompleting(true);
    try {
      const updated = await taskService.markCompleted(task.id);
      if (onTaskUpdated) {
        onTaskUpdated(updated);
      }
    } catch (error) {
      console.error('Error completing task:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  const handleEdit = async () => {
    if (!editedTitle.trim()) {
      alert('Title cannot be empty');
      return;
    }

    setIsSaving(true);
    try {
      const updatedTask = {
        title: editedTitle.trim(),
        description: editedDescription.trim(),
        dueDate: editedDueDate || null,
        status: task.status,
      };
      const updated = await taskService.updateTask(task.id, updatedTask);
      if (onTaskUpdated) {
        onTaskUpdated(updated);
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description || '');
    setEditedDueDate(task.dueDate || '');
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      try {
        await taskService.deleteTask(task.id);
        if (onTaskUpdated) {
          onTaskUpdated(null);
        }
      } catch (error) {
        console.error('Error deleting task:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-red-100 text-red-800';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800';
      case 'LOW':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'HIGH':
        return '🔴';
      case 'MEDIUM':
        return '🟡';
      case 'LOW':
        return '🟢';
      default:
        return '⚪';
    }
  };

  const isCompleted = task.status === 'COMPLETED';
  const daysLeft = task.dueDate ? Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24)) : null;

  if (isEditing) {
    return (
      <div className="p-5 mb-3 rounded-lg border border-blue-300 bg-blue-50">
        <h3 className="font-semibold text-gray-800 mb-4">✏️ Edit Task</h3>
        
        <div className="space-y-3 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSaving}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
              disabled={isSaving}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              value={editedDueDate}
              onChange={(e) => setEditedDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSaving}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium transition disabled:opacity-50"
          >
            {isSaving ? '💾 Saving...' : '💾 Save'}
          </button>
          <button
            onClick={handleCancel}
            disabled={isSaving}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 font-medium transition disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-5 mb-3 rounded-lg border transition-all duration-200 ${
      isCompleted 
        ? 'bg-gray-50 border-gray-200 opacity-60' 
        : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm'
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={handleCompleteClick}
              disabled={isCompleting}
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                isCompleted
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300 hover:border-green-500'
              }`}
              title="Click to mark as complete"
            >
              {isCompleted && <span className="text-white text-sm">✓</span>}
            </button>
            <h3 className={`text-base font-semibold ${isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.title}
            </h3>
          </div>

          {task.description && (
            <p className={`text-sm ml-9 mb-3 ${isCompleted ? 'text-gray-400' : 'text-gray-600'}`}>
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 ml-9 text-sm">
            <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(task.priority)}`}>
              {getPriorityIcon(task.priority)} {task.priority}
            </span>

            {task.dueDate && (
              <span className={`text-xs px-2 py-1 rounded ${
                daysLeft !== null && daysLeft <= 2 && !isCompleted
                  ? 'bg-red-100 text-red-700 font-semibold'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                📅 {new Date(task.dueDate).toLocaleDateString()}
                {daysLeft !== null && daysLeft >= 0 && !isCompleted && (
                  <span className="ml-1">({daysLeft}d)</span>
                )}
              </span>
            )}

            <span className="text-xs text-gray-500">
              📌 {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition"
            title="Edit task"
          >
            ✎️
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-3 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition"
            title="Delete task"
          >
            {isDeleting ? '⏳' : '🗑️'}
          </button>
        </div>
      </div>

      {/* Confirmation Dialog for Marking Complete */}
      {showCompleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm mx-4 animate-slide-in">
            <h3 className="text-lg font-bold text-gray-800 mb-2">✅ Mark Task Complete?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to mark "<strong>{task.title}</strong>" as complete?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowCompleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmComplete}
                disabled={isCompleting}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-medium transition disabled:opacity-50"
              >
                {isCompleting ? '⏳ Completing...' : '✅ Complete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog for Unmarking Task */}
      {showUnmarkConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm mx-4 animate-slide-in">
            <h3 className="text-lg font-bold text-gray-800 mb-2">📋 Task Already Completed</h3>
            <p className="text-gray-600 mb-6">
              "<strong>{task.title}</strong>" has already been marked as complete. Would you like to unmark it and reactivate this task?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowUnmarkConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 font-medium transition"
              >
                Keep Completed
              </button>
              <button
                onClick={confirmUnmark}
                disabled={isCompleting}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium transition disabled:opacity-50"
              >
                {isCompleting ? '⏳ Unmarking...' : '↩️ Unmark Task'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
