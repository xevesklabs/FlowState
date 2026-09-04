import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';

export function useTasks() {
  const tasks = useLiveQuery(
    () => db.tasks.orderBy('createdAt').reverse().toArray()
  ) ?? [];

  const addTask = async (title, priority) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    
    await db.tasks.add({
      title: trimmed,
      priority: priority || 'Medium',
      status: 'todo',
      createdAt: Date.now(),
    });
  };

  const updateTask = async (id, updates) => {
    await db.tasks.update(id, updates);
  };

  const deleteTask = async (id) => {
    await db.tasks.delete(id);
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    todoTasks: tasks.filter(t => t.status === 'todo'),
    inProgressTasks: tasks.filter(t => t.status === 'in_progress'),
    completedTasks: tasks.filter(t => t.status === 'completed')
  };
}