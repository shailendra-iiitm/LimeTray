import { memo } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';

const TaskList = memo(function TaskList() {
  const { filteredTasks, reorderTasks } = useTasks();

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    if (source.index === destination.index) return;

    reorderTasks(source.index, destination.index);
  };

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400 dark:text-gray-500">
        <svg
          className="mx-auto h-12 w-12 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p className="text-lg">No tasks found</p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`space-y-3 transition-colors ${
              snapshot.isDraggingOver ? 'bg-blue-50/50 dark:bg-blue-900/10 rounded-lg p-2' : ''
            }`}
          >
            {filteredTasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="task-item-enter"
                  >
                    <TaskItem
                      task={task}
                      index={index}
                      isDragging={snapshot.isDragging}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
});

export default TaskList;
