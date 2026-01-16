import { memo } from 'react';
import { useTasks } from '../context/TaskContext';

const TaskFilter = memo(function TaskFilter() {
  const { filter, setFilter, stats } = useTasks();

  const filters = [
    { value: 'all', label: 'All', count: stats.total },
    { value: 'pending', label: 'Pending', count: stats.pending },
    { value: 'completed', label: 'Completed', count: stats.completed },
  ];

  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      {filters.map(({ value, label, count }) => (
        <button
          key={value}
          onClick={() => setFilter(value)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
                      ${filter === value
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }
                      focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
        >
          {label} <span className="ml-1 opacity-75">({count})</span>
        </button>
      ))}
    </div>
  );
});

export default TaskFilter;
