import React, { useState, useEffect } from 'react';
import { X, Trash2, Check } from 'lucide-react';

export function TaskDrawer({ task, isOpen, onClose, onSave, onDelete }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('todo');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setPriority(task.priority);
      setStatus(task.status);
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleSave = () => {
    onSave(task.id, { title, priority, status });
    onClose();
  };

  // Reusable styles for the premium drawer look
  const labelStyle = {
    display: 'block',
    fontSize: '0.7rem',
    color: 'var(--text-secondary)',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '0.6rem'
  };

  const inputStyle = {
    width: '100%',
    background: '#111',
    border: '1px solid #333',
    color: '#fff',
    padding: '0.85rem 1rem',
    borderRadius: '6px',
    outline: 'none',
    fontSize: '0.95rem',
    fontFamily: 'var(--font-sans)',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 40,
          backdropFilter: 'blur(3px)'
        }}
      />

      {/* Premium Drawer Panel */}
      <div 
        style={{
          position: 'fixed',
          top: 0, right: 0, bottom: 0,
          width: '450px',
          background: '#0a0a0a',
          borderLeft: '1px solid #222',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.8)'
        }}
      >
        {/* Drawer Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 2rem 1.5rem', borderBottom: '1px solid #222' }}>
          <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 600, margin: 0, color: '#fff' }}>Edit Task.</h2>
          <button 
            onClick={onClose} 
            style={{ 
              background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', borderRadius: '50%',
              transition: 'background 0.2s ease, color 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = '#222'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body (Form) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1, padding: '2rem' }}>
          
          <div>
            <label style={labelStyle}>Task Title</label>
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputStyle}
              onFocus={(e) => { e.target.style.borderColor = '#666'; }}
              onBlur={(e) => { e.target.style.borderColor = '#333'; }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Status</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}
                onFocus={(e) => { e.target.style.borderColor = '#666'; }}
                onBlur={(e) => { e.target.style.borderColor = '#333'; }}
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Done</option>
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Difficulty</label>
              <select 
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}
                onFocus={(e) => { e.target.style.borderColor = '#666'; }}
                onBlur={(e) => { e.target.style.borderColor = '#333'; }}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

        </div>

        {/* Drawer Footer (Actions) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 2rem', borderTop: '1px solid #222', background: '#0a0a0a' }}>
          <button 
            onClick={() => { onDelete(task.id); onClose(); }}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', 
              border: '1px solid rgba(217, 75, 75, 0.4)', color: '#d94b4b', padding: '0.75rem 1.25rem', 
              borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(217, 75, 75, 0.1)'; e.currentTarget.style.borderColor = '#d94b4b'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(217, 75, 75, 0.4)'; }}
          >
            <Trash2 size={16} /> Delete
          </button>
          
          <button 
            onClick={handleSave}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fff', color: '#000', 
              border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', cursor: 'pointer', 
              fontWeight: 600, fontSize: '0.85rem', transition: 'transform 0.1s ease'
            }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.96)'; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <Check size={16} /> Save Changes
          </button>
        </div>

      </div>
    </>
  );
}