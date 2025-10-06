export const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      const newTask = {
        id: Date.now(),
        text: action.payload,
        completed: false,
        createdAt: new Date().toISOString()
      };
      return [...state, newTask];

    case 'TOGGLE_TASK':
      return state.map(task =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );

    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload);

    case 'CLEAR_COMPLETED':
      return state.filter(task => !task.completed);

    case 'LOAD_TASKS':
      return action.payload;

    default:
      return state;
  }
};
