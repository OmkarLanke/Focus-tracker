# Focus Tracker - React Hooks Demo

A simple React app demonstrating all the main React hooks: useState, useEffect, useRef, useContext, useReducer, and a custom hook.

## Features

- ✅ **useState**: Manages task list and input field value
- ✅ **useEffect**: Saves tasks to localStorage and loads on startup
- ✅ **useRef**: Auto-focuses the input box when the page loads
- ✅ **useContext**: Theme context with light/dark mode toggle
- ✅ **useReducer**: Manages task state (add, toggle, delete, clear)
- ✅ **Custom Hook (useTimer)**: Tracks how long the app has been open
- ✅ **Bonus**: Focus timer display and beautiful Tailwind CSS styling

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── App.js                 # Main app component
├── components/
│   └── TaskList.js        # Task list component
├── context/
│   └── ThemeContext.js    # Theme context provider
├── hooks/
│   └── useTimer.js        # Custom timer hook
├── reducers/
│   └── taskReducer.js     # Task state reducer
├── styles.css             # Tailwind CSS styles
└── index.js               # App entry point
```

## Usage

1. **Add Tasks**: Type in the input field and press Enter or click "Add Task"
2. **Complete Tasks**: Click the circle next to any task to mark it complete
3. **Delete Tasks**: Click the trash icon to remove a task
4. **Clear Completed**: Click "Clear Completed" to remove all finished tasks
5. **Toggle Theme**: Click the sun/moon icon to switch between light and dark modes
6. **View Timer**: See how long you've been focused at the top of the app

## Data Persistence

- Tasks are automatically saved to localStorage
- Theme preference is saved to localStorage
- Timer resets when the page is refreshed (as intended)

## Built With

- React 18
- Tailwind CSS
- Modern React Hooks
- LocalStorage API

## Hooks Demonstrated

1. **useState**: Managing input value and form state
2. **useEffect**: localStorage operations and auto-focus
3. **useRef**: Direct DOM manipulation for input focus
4. **useContext**: Global theme state management
5. **useReducer**: Complex state management for tasks
6. **Custom Hook**: Reusable timer logic

Perfect for learning React hooks fundamentals!
