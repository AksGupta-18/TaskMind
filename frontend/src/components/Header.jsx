import React from 'react';

export function Header() {
  return (
    <header className="bg-gradient-to-b from-white via-blue-50 to-transparent border-b border-blue-100 shadow-sm mb-8">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold flex items-center justify-center gap-3 mb-4">
            🧠 TaskMind
          </h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            <span>⚡</span>
            <span>Smart priority assignment with AI</span>
          </div>
        </div>
      </div>
    </header>
  );
}
