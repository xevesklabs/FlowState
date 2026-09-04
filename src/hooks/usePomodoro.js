import { useState, useEffect, useCallback, useRef } from 'react';
import { db } from '../lib/db';

const MODES = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60
};

export function usePomodoro() {
  const [mode, setMode] = useState('focus');
  const [timeLeft, setTimeLeft] = useState(MODES.focus);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  // Store targetTime in a ref so useEffect doesn't need timeLeft as a dep
  const targetTimeRef = useRef(null);

  const switchMode = useCallback((newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(MODES[newMode]);
  }, []);

  const logSession = useCallback(async (completedMode, durationInSeconds) => {
    if (completedMode === 'focus') {
      await db.pomodoroSessions.add({
        mode: 'focus',
        duration: durationInSeconds,
        completedAt: Date.now()
      });
      setSessionsCompleted(prev => prev + 1);
    }
  }, []);

  // Set targetTime when the timer starts
  useEffect(() => {
    if (isRunning) {
      targetTimeRef.current = Date.now() + timeLeft * 1000;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]); // only recalculate when isRunning toggles, not every tick

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const remaining = Math.round((targetTimeRef.current - Date.now()) / 1000);

      if (remaining <= 0) {
        clearInterval(interval);
        setIsRunning(false);
        setTimeLeft(0);
        logSession(mode, MODES[mode]);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, mode, logSession]);

  const toggleTimer = () => setIsRunning(prev => !prev);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(MODES[mode]);
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    mode,
    timeLeft,
    isRunning,
    sessionsCompleted,
    switchMode,
    toggleTimer,
    resetTimer,
    formatTime
  };
}