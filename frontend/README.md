# Task Management Frontend

A modern, beautiful React-based frontend for task management with AI-powered priority assignment.

## Features

✨ **Modern UI**
- Beautiful gradient design with Tailwind CSS
- Smooth animations and transitions
- Emoji-based visual indicators for better UX
- Responsive design

🤖 **Smart Task Management**
- AI-powered priority assignment (HIGH/MEDIUM/LOW)
- Auto-priority based on keywords and due dates
- Real-time task status updates
- Quick task completion with one click

📊 **Analytics at a Glance**
- Dashboard stats showing total, active, and completed tasks
- High-priority task counter
- Task sorting (by date, priority, creation time)

🎯 **Full CRUD Operations**
- Create new tasks with title, description, and due date
- Update task status (mark as completed)
- Delete tasks
- Filter by status (All, Active, Completed)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The app will open at http://localhost:3000

## Configuration

Make sure your backend is running on `http://localhost:8080`

If you need to change the backend URL, edit `.env` or modify `src/services/taskService.js`

## Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests

## Tech Stack

- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **PostCSS & Autoprefixer** - CSS processing

## Architecture

```
src/
├── components/
│   ├── Header.jsx        - App header with branding
│   ├── TaskForm.jsx      - Form to create new tasks
│   ├── TaskItem.jsx      - Individual task component
│   └── TaskList.jsx      - Task list with filtering
├── services/
│   └── taskService.js    - API communication layer
├── App.jsx               - Main app component
├── index.js              - Entry point
└── index.css             - Global styles & Tailwind
```

## Performance Features

- Lazy loading and efficient re-renders
- Optimized animations
- Minimal dependencies
- Clean component structure

## Design Highlights

- 🎨 Gradient backgrounds and modern color scheme
- 🔴🟡🟢 Color-coded priority levels
- ⏰ Due date with days-left counter
- 📱 Mobile-responsive layout
- ✨ Smooth fade-in and slide-in animations
