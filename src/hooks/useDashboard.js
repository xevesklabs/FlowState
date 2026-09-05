import { useMemo } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import { getLocalDateString } from './useHabits';

export function useDashboard() {
  // Removed the inline ?? [] to preserve reference stability
  const tasks = useLiveQuery(() => db.tasks.toArray());
  const habits = useLiveQuery(() => db.habits.toArray());
  const habitLogs = useLiveQuery(() => db.habitLogs.toArray());
  const pomodoros = useLiveQuery(() => db.pomodoroSessions.toArray());

  const urgentTasks = useMemo(() => {
    // Apply fallback inside the memoized function
    return (tasks || [])
      .filter(t => t.status !== 'completed')
      .sort((a, b) => (a.deadline || 0) - (b.deadline || 0))
      .slice(0, 5);
  }, [tasks]);

  const todayStr = getLocalDateString();
  const todayHabits = useMemo(() => {
    return (habits || []).map(h => ({
      ...h,
      isCompleted: (habitLogs || []).some(log => log.habitId === h.id && log.date === todayStr)
    }));
  }, [habits, habitLogs, todayStr]);

  const heatmap = useMemo(() => {
    const days = [];
    const safeHabitLogs = habitLogs || [];
    const safePomodoros = pomodoros || [];

    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = getLocalDateString(d);

      const dayHabits = safeHabitLogs.filter(log => log.date === dateStr).length;
      
      const dayPomodoros = safePomodoros.filter(p => {
        return p.completedAt && getLocalDateString(new Date(p.completedAt)) === dateStr;
      }).length;

      const totalScore = dayHabits + (dayPomodoros * 2); 
      let intensity = 0;
      if (totalScore > 0) intensity = 1;
      if (totalScore > 3) intensity = 2;
      if (totalScore > 6) intensity = 3;
      if (totalScore > 9) intensity = 4;

      days.push({ dateStr, pomodoros: dayPomodoros, habits: dayHabits, intensity });
    }
    return days;
  }, [habitLogs, pomodoros]);

  return { urgentTasks, todayHabits, heatmap };
}