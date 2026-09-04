import { useEffect, useState } from 'react'; // Fix 1: Removed unused 'React' import

export function TaskCard({ task, onClick }) {
  // Fix 2: Lazy initialization '() => Date.now()' keeps the render pure
  const [now, setNow] = useState(() => Date.now());
  
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);

  const getDifficultyClass = (priority) => {
    switch (priority) {
      case 'High': return 'diff-high';
      case 'Medium': return 'diff-medium';
      case 'Low': return 'diff-low';
      default: return 'diff-medium';
    }
  };

  // Urgency Calculation
  const timeDiff = task.deadline - now;
  const isOverdue = timeDiff < 0 && task.status !== 'completed';
  
  // Fix 3: Just declare the variable without a useless initial assignment
  let timeText; 
  if (task.status === 'completed') {
    timeText = 'Completed';
  } else if (isOverdue) {
    timeText = 'Overdue';
  } else {
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    if (days > 0) timeText = `${days}d left`;
    else if (hours > 0) timeText = `${hours}h left`;
    else timeText = '< 1h left';
  }

  return (
    <div className="task-card" onClick={() => onClick(task)}>
      <div className="card-top">
        <span className={`difficulty-badge ${getDifficultyClass(task.priority)}`}>
          {task.priority}
        </span>
        <span className="card-time" style={{ color: isOverdue ? '#d94b4b' : (task.status === 'completed' ? '#6e8574' : 'var(--text-secondary)') }}>
          {timeText}
        </span>
      </div>
      
      <h3 className="card-title" style={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none', opacity: task.status === 'completed' ? 0.6 : 1 }}>
        {task.title}
      </h3>
      
      <div className="card-bottom">
        <div className="avatar-group">
          <div className="avatar">ME</div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>You</span>
        </div>
        {isOverdue && <span className="badge-ovr">OVR</span>}
      </div>
    </div>
  );
}