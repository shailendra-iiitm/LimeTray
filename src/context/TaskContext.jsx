import { createContext, useContext, useCallback, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [filter, setFilter] = useLocalStorage('filter', 'all');

  const addTask = useCallback((title) => {
    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
  }, [setTasks]);

  const toggleTask = useCallback((id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, [setTasks]);

  const reorderTasks = useCallback((startIndex, endIndex) => {
    setTasks(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  }, [setTasks]);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const stats = useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
  }), [tasks]);

  const value = useMemo(() => ({
    tasks,
    filteredTasks,
    filter,
    stats,
    addTask,
    toggleTask,
    deleteTask,
    setFilter,
    reorderTasks,
  }), [tasks, filteredTasks, filter, stats, addTask, toggleTask, deleteTask, setFilter, reorderTasks]);

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
}
