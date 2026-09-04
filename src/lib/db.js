import Dexie from 'dexie';

/**
 * @typedef {Object} Task
 * @property {number} [id]
 * @property {string} title
 * @property {'High' | 'Medium' | 'Low'} priority
 * @property {'todo' | 'in_progress' | 'completed'} status
 * @property {number} createdAt
 */

export class FlowStateDB extends Dexie {
  constructor() {
    super('FlowStateDB');
    
    // Schema Version 1 (Legacy)
    this.version(1).stores({
      tasks: '++id, priority, completed, createdAt',
      notes: '++id, isPinned, updatedAt',
      habits: '++id, createdAt',
      habitLogs: '++id, habitId, date'
    });

    // Schema Version 2 (Adding Workflow Statuses)
    this.version(2).stores({
      tasks: '++id, status, priority, createdAt',
    }).upgrade(tx => {
      // Migrate existing tasks safely
      return tx.tasks.toCollection().modify(task => {
        task.status = task.completed ? 'completed' : 'todo';
        delete task.completed;
      });
    });
  }
}

export const db = new FlowStateDB();