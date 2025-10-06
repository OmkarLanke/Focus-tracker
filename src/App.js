import React, { useState, useEffect, useRef, useReducer } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { taskReducer } from './reducers/taskReducer';
import { useTimer } from './hooks/useTimer';
import TaskList from './components/TaskList';
import './styles.css';

const AppContent = () => {
  // useState for input field value
  const [inputValue, setInputValue] = useState('');
  
  // useReducer for task management
  const [tasks, dispatch] = useReducer(taskReducer, []);
  
  // useRef for auto-focusing input
  const inputRef = useRef(null);
  
  // Custom hook for timer
  const { seconds, formattedTime } = useTimer();
  
  // useContext for theme
  const { isDark, toggleTheme } = useTheme();

  // useEffect for localStorage and auto-focus
  useEffect(() => {
    // Load saved tasks from localStorage
    const savedTasks = localStorage.getItem('focus-tracker-tasks');
    if (savedTasks) {
      dispatch({ type: 'LOAD_TASKS', payload: JSON.parse(savedTasks) });
    }
    
    // Auto-focus input on component mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('focus-tracker-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch({ type: 'ADD_TASK', payload: inputValue.trim() });
      setInputValue('');
    }
  };

  const handleToggleTask = (id) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  const handleDeleteTask = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const handleClearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Focus Tracker
          </h1>
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-full transition-colors ${
              isDark
                ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            {isDark ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>

        {/* Timer Display */}
        <div className={`text-center mb-8 p-6 rounded-xl ${
          isDark ? 'bg-gray-800' : 'bg-white shadow-md'
        }`}>
          <h2 className="text-lg font-semibold mb-2">Focus Session</h2>
          <p className="text-3xl font-bold text-blue-500 mb-2">{formattedTime}</p>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            You've been focused for {seconds} seconds
          </p>
        </div>

        {/* Task Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className={`p-4 rounded-lg text-center ${
            isDark ? 'bg-blue-900/30' : 'bg-blue-50'
          }`}>
            <div className="text-2xl font-bold text-blue-500">{totalTasks}</div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Total Tasks
            </div>
          </div>
          <div className={`p-4 rounded-lg text-center ${
            isDark ? 'bg-green-900/30' : 'bg-green-50'
          }`}>
            <div className="text-2xl font-bold text-green-500">{completedTasks}</div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Completed
            </div>
          </div>
        </div>

        {/* Add Task Form */}
        <form onSubmit={handleAddTask} className="mb-6">
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add a new task..."
              className={`flex-1 px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!inputValue.trim()}
            >
              Add Task
            </button>
          </div>
        </form>

        {/* Task List */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Your Tasks</h3>
            {completedTasks > 0 && (
              <button
                onClick={handleClearCompleted}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDark
                    ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50'
                    : 'bg-red-50 text-red-600 hover:bg-red-100'
                }`}
              >
                Clear Completed
              </button>
            )}
          </div>
          <TaskList
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>

        {/* Footer */}
        <div className={`text-center text-sm ${
          isDark ? 'text-gray-500' : 'text-gray-400'
        }`}>
          <p>Built with React Hooks • useState • useEffect • useRef • useContext • useReducer • Custom Hook</p>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
