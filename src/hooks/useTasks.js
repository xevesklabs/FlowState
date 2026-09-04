// src/hooks/useTasks.js
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';

export function useTasks() {
  const tasks = useLiveQuery(
    async () => {
      const allTasks = await db.tasks.toArray();
      // Sort by deadline ascending (most urgent first)
      return allTasks.sort((a, b) => (a.deadline || Infinity) - (b.deadline || Infinity));
    }
  ) ?? [];

  const addTask = async (title, priority, deadline) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    await db.tasks.add({
      title: trimmed,
      priority: priority || 'Medium',
      status: 'todo',
      deadline: deadline || (Date.now() + 24 * 60 * 60 * 1000), // Default 24h
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