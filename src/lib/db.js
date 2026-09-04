import Dexie from 'dexie';

/**
 * @typedef {Object} Task
 * @property {number} [id]
 * @property {string} title
 * @property {'High' | 'Medium' | 'Low'} priority
 * @property {boolean} completed
 * @property {number} createdAt
 */

/**
 * @typedef {Object} Note
 * @property {number} [id]
 * @property {string} title
 * @property {string} content
 * @property {string[]} tags
 * @property {boolean} isPinned
 * @property {number} updatedAt
 */

export class FlowStateDB extends Dexie {
  constructor() {
    super('FlowStateDB');
    
    // Schema Version 1
    this.version(1).stores({
      tasks: '++id, priority, completed, createdAt',
      notes: '++id, isPinned, updatedAt',
      habits: '++id, createdAt',
      habitLogs: '++id, habitId, date'
    });
  }
}

export const db = new FlowStateDB();