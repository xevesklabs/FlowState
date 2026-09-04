import Dexie from 'dexie';

export class FlowStateDB extends Dexie {
  constructor() {
    super('FlowStateDB');
    
    // v1: Initial structure
    this.version(1).stores({
      tasks: '++id, priority, completed, createdAt',
      notes: '++id, isPinned, updatedAt',
      habits: '++id, createdAt',
      habitLogs: '++id, habitId, date'
    });

    // v2: Kanban statuses
    this.version(2).stores({
      tasks: '++id, status, priority, createdAt',
    }).upgrade(tx => {
      return tx.tasks.toCollection().modify(task => {
        task.status = task.completed ? 'completed' : 'todo';
        delete task.completed;
      });
    });

    // v3: Urgency metrics
    this.version(3).stores({
      tasks: '++id, status, priority, deadline, createdAt',
    }).upgrade(tx => {
      return tx.tasks.toCollection().modify(task => {
        task.deadline = task.deadline || (Date.now() + 7 * 24 * 60 * 60 * 1000); 
      });
    });

    // v4: Pomodoro tracking
    this.version(4).stores({
      pomodoroSessions: '++id, mode, duration, completedAt'
    });

    // v5: Previous attempt (kept to maintain the upgrade chain)
    this.version(5).stores({
      habits: '++id, name, createdAt',
      habitLogs: '[habitId+date], habitId, date' 
    });

    // FIX (v6): Restoring ++id as primary key to resolve IndexedDB block
    this.version(6).stores({
      habits: '++id, name, createdAt',
      habitLogs: '++id, [habitId+date], habitId, date' 
    });
  }
}

export const db = new FlowStateDB();