import { useState, memo } from 'react';
import { useTasks } from '../context/TaskContext';

const TaskForm = memo(function TaskForm() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const { addTask } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!input.trim()) {
      setError('Task cannot be empty');
      return;
    }

    addTask(input);
    setInput('');
    setError('');
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    if (error) setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Add a new task..."
          className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            ${error 
              ? 'border-red-500 focus:border-red-600' 
              : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'
            }
            focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium 
                     rounded-lg transition-colors duration-200 
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          Add
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500 animate-shake">
          {error}
        </p>
      )}
    </form>
  );
});

export default TaskForm;
