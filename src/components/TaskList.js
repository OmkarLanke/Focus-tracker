import React from 'react';
import { useTheme } from '../context/ThemeContext';

const TaskList = ({ tasks, onToggleTask, onDeleteTask }) => {
  const { isDark } = useTheme();

  if (tasks.length === 0) {
    return (
      <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        <p className="text-lg">No tasks yet. Add one above to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <div
          key={task.id}
          className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
            isDark
              ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onToggleTask(task.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                task.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : isDark
                  ? 'border-gray-600 hover:border-green-500'
                  : 'border-gray-300 hover:border-green-500'
              }`}
            >
              {task.completed && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <span
              className={`${
                task.completed
                  ? 'line-through opacity-60'
                  : isDark
                  ? 'text-gray-200'
                  : 'text-gray-800'
              }`}
            >
              {task.text}
            </span>
          </div>
          <button
            onClick={() => onDeleteTask(task.id)}
            className={`p-2 rounded-full transition-colors ${
              isDark
                ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700'
                : 'text-gray-500 hover:text-red-500 hover:bg-gray-100'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
