import React, { useState, useEffect } from 'react';
import './index.css';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { taskService } from './services/taskService';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks. Make sure the backend is running on http://localhost:8080');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAdded = (newTask) => {
    setTasks([newTask, ...tasks]);
    setShowForm(false);
  };

  const handleTasksUpdated = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50">
      <Header />

      <main className="max-w-5xl mx-auto px-4 pb-16">
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <span className="flex-1">{error}</span>
            <button
              onClick={loadTasks}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-semibold transition"
            >
              Retry
            </button>
          </div>
        )}

        {loading && !error ? (
          <div className="text-center py-20">
            <div className="inline-block">
              <div className="animate-spin text-5xl mb-4">⏳</div>
              <p className="text-gray-600 font-medium text-lg">Loading your tasks...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Top Section with Button and Filters */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <button
                  onClick={() => setShowForm(!showForm)}
                  className={`px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-200 flex items-center gap-2 ${
                    showForm
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                  }`}
                >
                  {showForm ? '✕ Cancel' : '➕ Add New Task'}
                </button>

                {/* Filter Tabs */}
                <div className="flex gap-2">
                  {[
                    { value: 'all', label: '📋 All' },
                    { value: 'active', label: '⚡ Active' },
                    { value: 'completed', label: '✅ Done' },
                  ].map((tab) => (
                    <button
                      key={tab.value}
                      onClick={() => setFilter(tab.value)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        filter === tab.value
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Search tasks by title or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-5 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Task Form - Shown when button clicked */}
            {showForm && (
              <div className="mb-8 animate-slide-in">
                <TaskForm onTaskAdded={handleTaskAdded} />
              </div>
            )}

            {/* Tasks List Section */}
            <div>
              <TaskList
                tasks={tasks}
                filter={filter}
                searchQuery={searchQuery}
                onTasksUpdated={handleTasksUpdated}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
