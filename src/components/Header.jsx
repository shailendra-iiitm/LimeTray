import { memo } from 'react';
import { useTheme } from '../context/ThemeContext';

const Header = memo(function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="mb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Task Manager
        </h1>
        
        <button
          onClick={toggleTheme}
          className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 
                     hover:bg-gray-300 dark:hover:bg-gray-600
                     transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </button>
      </div>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Organize your tasks efficiently
      </p>
    </header>
  );
});

export default Header;
