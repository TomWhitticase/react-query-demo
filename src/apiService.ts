import { Todo } from "./types/Todo";
import { v4 as uuidv4 } from 'uuid';

// Using local storage as a mock database

const LOCAL_STORAGE_KEY = 'todos';
const RESPONSE_TIME = 500;

const loadFromLocalStorage = (): Todo[] => {
  const todos = localStorage.getItem(LOCAL_STORAGE_KEY);
  return todos ? JSON.parse(todos) : [];
};

const saveToLocalStorage = (todos: Todo[]): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
};

const apiService = {
  fetchTodos: async (): Promise<Todo[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const todos = loadFromLocalStorage();
        resolve(todos);
      }, RESPONSE_TIME);
    });
  },

  addTodo: async (title: string): Promise<Todo> => {
    const newTodo: Todo = {
      id: uuidv4(),
      title: title,
      completed: false
    };

    const todos = loadFromLocalStorage();
    todos.push(newTodo);
    saveToLocalStorage(todos);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(newTodo);
      }, RESPONSE_TIME);
    });
  },

  clearTodos: async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        saveToLocalStorage([]);
        resolve();
      }, RESPONSE_TIME);
    });
  },

  clearCompletedTodos: async (): Promise<void> => {
    const todos = loadFromLocalStorage();
    const activeTodos = todos.filter(todo => !todo.completed); // Filter out completed todos
    saveToLocalStorage(activeTodos);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, RESPONSE_TIME);
    });
  },

  toggleComplete: async (id: string): Promise<Todo | null> => {
    const todos = loadFromLocalStorage();
    const todo = todos.find(t => t.id === id);
    if (!todo) return null;

    todo.completed = !todo.completed;
    saveToLocalStorage(todos);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(todo);
      }, RESPONSE_TIME);
    });
  }
};

export default apiService;
