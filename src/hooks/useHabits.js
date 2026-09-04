import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';

// Timezone-safe local date string generator (YYYY-MM-DD)
export const getLocalDateString = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export function useHabits() {
  const habits = useLiveQuery(() => db.habits.orderBy('createdAt').toArray()) ?? [];
  const habitLogs = useLiveQuery(() => db.habitLogs.toArray()) ?? [];

  const addHabit = async (name) => {
    if (!name.trim()) return;
    await db.habits.add({
      name: name.trim(),
      createdAt: Date.now()
    });
  };

  const deleteHabit = async (id) => {
    // Transaction ensures we delete the habit AND all its historical logs
    await db.transaction('rw', db.habits, db.habitLogs, async () => {
      await db.habits.delete(id);
      await db.habitLogs.where('habitId').equals(id).delete();
    });
  };

  const toggleHabitLog = async (habitId, dateStr) => {
    const existingLog = await db.habitLogs.get({ habitId, date: dateStr });
    
    if (existingLog) {
      // If it exists, user is un-checking it
      await db.habitLogs.where({ habitId, date: dateStr }).delete();
    } else {
      // If it doesn't exist, user is checking it
      await db.habitLogs.add({
        habitId,
        date: dateStr
      });
    }
  };

  return {
    habits,
    habitLogs,
    addHabit,
    deleteHabit,
    toggleHabitLog
  };
}