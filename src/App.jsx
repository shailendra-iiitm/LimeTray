import { TaskProvider } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <Header />
            <TaskForm />
            <TaskFilter />
            <TaskList />
          </div>
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App
