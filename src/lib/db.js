import Dexie from 'dexie';

export class FlowStateDB extends Dexie {
  constructor() {
    super('FlowStateDB');
    
    this.version(1).stores({
      tasks: '++id, priority, completed, createdAt',
      notes: '++id, isPinned, updatedAt',
      habits: '++id, createdAt',
      habitLogs: '++id, habitId, date'
    });

    this.version(2).stores({
      tasks: '++id, status, priority, createdAt',
    }).upgrade(tx => {
      return tx.tasks.toCollection().modify(task => {
        task.status = task.completed ? 'completed' : 'todo';
        delete task.completed;
      });
    });

    this.version(3).stores({
      tasks: '++id, status, priority, deadline, createdAt',
    }).upgrade(tx => {
      return tx.tasks.toCollection().modify(task => {
        task.deadline = task.deadline || (Date.now() + 7 * 24 * 60 * 60 * 1000); 
      });
    });

    // NEW: Schema Version 4 - Adding Pomodoro tracking
    this.version(4).stores({
      pomodoroSessions: '++id, mode, duration, completedAt'
    });
  }
}

export const db = new FlowStateDB();