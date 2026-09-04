import { usePomodoro } from '../hooks/usePomodoro';
import { Play, Pause, RotateCcw, CheckCircle2 } from 'lucide-react';

export function Pomodoro() {
  const {
    mode,
    isRunning,
    sessionsCompleted,
    switchMode,
    toggleTimer,
    resetTimer,
    formatTime
  } = usePomodoro();

  const buttonStyle = (isActive) => ({
    padding: '0.6rem 1.25rem',
    cursor: 'pointer',
    background: isActive ? '#1a1a1a' : 'transparent',
    color: isActive ? '#fff' : 'var(--text-secondary)',
    border: '1px solid',
    borderColor: isActive ? '#333' : 'transparent',
    borderRadius: '6px',
    fontSize: '0.8rem',
    fontFamily: 'var(--font-mono)',
    transition: 'all 0.2s ease',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', maxWidth: '600px', margin: '0 auto' }}>
      
      <header>
        <h1 className="font-serif" style={{ fontSize: '2.5rem', fontWeight: 600, margin: 0, color: '#fff' }}>Pomodoro.</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Strict focus intervals for deep developer work.</p>
      </header>

      {/* Mode Switcher Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid #222', paddingBottom: '1rem' }}>
        <button onClick={() => switchMode('focus')} style={buttonStyle(mode === 'focus')}>FOCUS (25M)</button>
        <button onClick={() => switchMode('shortBreak')} style={buttonStyle(mode === 'shortBreak')}>SHORT BREAK (5M)</button>
        <button onClick={() => switchMode('longBreak')} style={buttonStyle(mode === 'longBreak')}>LONG BREAK (15M)</button>
      </div>

      {/* Main Timer Display Panel */}
      <div className="panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', gap: '2rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '6rem', fontWeight: 700, letterSpacing: '-0.05em', color: '#fff' }}>
          {formatTime()}
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={toggleTimer}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fff', color: '#000', 
              border: 'none', padding: '0.75rem 2rem', borderRadius: '6px', cursor: 'pointer', 
              fontWeight: 600, fontSize: '0.9rem', fontFamily: 'var(--font-mono)'
            }}
          >
            {isRunning ? <><Pause size={18} /> PAUSE</> : <><Play size={18} /> START</>}
          </button>
          
          <button 
            onClick={resetTimer}
            style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', 
              border: '1px solid #333', color: 'var(--text-secondary)', padding: '0.75rem', 
              borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s ease'
            }}
            title="Reset Timer"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* Session Counter Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', background: '#0a0a0a', border: '1px solid #222', borderRadius: '6px' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>Focus Sessions Completed Today</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
          <CheckCircle2 size={16} style={{ color: 'var(--accent-green)' }} />
          {sessionsCompleted}
        </div>
      </div>

    </div>
  );
}