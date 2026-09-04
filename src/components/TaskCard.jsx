import React from 'react';

export function TaskCard({ task, onClick }) {
  const getDifficultyClass = (priority) => {
    switch (priority) {
      case 'High': return 'diff-high';
      case 'Medium': return 'diff-medium';
      case 'Low': return 'diff-low';
      default: return 'diff-medium';
    }
  };

  // Format time relative to creation
  const daysAgo = Math.floor((Date.now() - task.createdAt) / (1000 * 60 * 60 * 24));
  const timeText = task.status === 'completed' 
    ? 'Completed' 
    : (daysAgo === 0 ? 'Today' : `${daysAgo} days`);

  return (
    <div className="task-card" onClick={() => onClick(task)}>
      <div className="card-top">
        <span className={`difficulty-badge ${getDifficultyClass(task.priority)}`}>
          {task.priority}
        </span>
        <span className="card-time" style={{ color: task.status === 'completed' ? '#6e8574' : '' }}>
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
        {task.status !== 'completed' && (
           <span className="badge-ovr">OVR</span>
        )}
      </div>
    </div>
  );
}