import { memo } from 'react';
import { useTasks } from '../context/TaskContext';

const TaskItem = memo(function TaskItem({ task, index, isDragging }) {
  const { toggleTask, deleteTask } = useTasks();

  return (
    <div
      className={`group flex items-center gap-3 p-4 rounded-lg border-2 
                  bg-white dark:bg-gray-800 
                  border-gray-200 dark:border-gray-700
                  transition-all duration-200
                  ${isDragging ? 'shadow-lg opacity-80' : 'hover:shadow-md'}
                  ${task.completed ? 'opacity-60' : ''}`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 
                   text-blue-600 focus:ring-blue-500 focus:ring-2 
                   cursor-pointer transition-all"
      />
      
      <span
        className={`flex-1 text-gray-800 dark:text-gray-200 transition-all
                    ${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}
      >
        {task.title}
      </span>

      <button
        onClick={() => deleteTask(task.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity
                   px-3 py-1 text-sm text-red-600 dark:text-red-400 
                   hover:bg-red-50 dark:hover:bg-red-900/20 rounded
                   focus:outline-none focus:ring-2 focus:ring-red-500/50"
        aria-label="Delete task"
      >
        Delete
      </button>
    </div>
  );
});

export default TaskItem;
