import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { TaskCard } from '../components/TaskCard';
import { TaskDrawer } from '../components/TaskDrawer';
import { Plus } from 'lucide-react';

export function Tasks() {
  const { todoTasks, inProgressTasks, completedTasks, addTask, updateTask, deleteTask } = useTasks();
  
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Big Input Card State
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newDifficulty, setNewDifficulty] = useState('Medium');

  const handleAddTask = (e) => {
    e.preventDefault();
    addTask(newTaskTitle, newDifficulty);
    setNewTaskTitle('');
    setNewDifficulty('Medium');
  };

  const openDrawer = (task) => {
    setSelectedTask(task);
    setIsDrawerOpen(true);
  };

  const toggleStyle = (tabId) => ({
    padding: '0.6rem 1.25rem',
    cursor: 'pointer',
    background: activeTab === tabId ? '#1a1a1a' : 'transparent',
    color: activeTab === tabId ? '#fff' : 'var(--text-secondary)',
    border: '1px solid',
    borderColor: activeTab === tabId ? '#333' : 'transparent',
    borderRadius: '6px',
    fontSize: '0.8rem',
    fontFamily: 'var(--font-mono)',
    transition: 'all 0.2s ease',
  });

  const renderColumn = (title, count, tasks, dotColor) => (
    <div className="kanban-column">
      <div className="column-header">
        <div className="column-title">
          <span style={{ color: dotColor, fontSize: '1.2rem', lineHeight: 0 }}>●</span>
          {title}
        </div>
        <span className="column-count">{count}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onClick={openDrawer} />
        ))}
        {tasks.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#444', border: '1px dashed #222', borderRadius: '6px', fontSize: '0.85rem' }}>
            Empty
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Page Header */}
      <header>
        <h1 className="font-serif" style={{ fontSize: '2.5rem', fontWeight: 600, margin: 0, color: '#fff' }}>Tasks.</h1>
      </header>
      
      {/* Big Add Task Card */}
      <form onSubmit={handleAddTask} className="input-card">
        <input 
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="What needs to be done?"
          style={{ 
            background: 'transparent', border: 'none', color: '#fff',
            fontSize: '1.25rem', outline: 'none', width: '100%'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #222' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Difficulty</span>
            <select 
              value={newDifficulty}
              onChange={(e) => setNewDifficulty(e.target.value)}
              style={{
                background: '#111', border: '1px solid #333', color: '#fff',
                padding: '0.4rem 0.8rem', borderRadius: '4px', outline: 'none', fontSize: '0.8rem', fontFamily: 'var(--font-mono)'
              }}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <button 
            type="submit"
            disabled={!newTaskTitle.trim()}
            style={{ 
              background: '#fff', color: '#000', border: 'none', 
              padding: '0.5rem 1.5rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
              fontWeight: 600, fontSize: '0.85rem'
            }}
          >
            <Plus size={16} /> Create Task
          </button>
        </div>
      </form>

      {/* Top Toggle Bar */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid #222', paddingBottom: '1rem' }}>
        <button type="button" onClick={() => setActiveTab('all')} style={toggleStyle('all')}>ALL BOARDS</button>
        <button type="button" onClick={() => setActiveTab('todo')} style={toggleStyle('todo')}>TO DO</button>
        <button type="button" onClick={() => setActiveTab('in_progress')} style={toggleStyle('in_progress')}>IN PROGRESS</button>
        <button type="button" onClick={() => setActiveTab('completed')} style={toggleStyle('completed')}>DONE</button>
      </div>

      {/* Kanban Board Grid */}
      <div className="kanban-board">
        {(activeTab === 'all' || activeTab === 'todo') && 
          renderColumn('TO DO', todoTasks.length, todoTasks, '#666')}
        
        {(activeTab === 'all' || activeTab === 'in_progress') && 
          renderColumn('IN PROGRESS', inProgressTasks.length, inProgressTasks, '#d98e4b')}
        
        {(activeTab === 'all' || activeTab === 'completed') && 
          renderColumn('DONE', completedTasks.length, completedTasks, '#6e8574')}
      </div>

      {/* Side Drawer */}
      <TaskDrawer 
        task={selectedTask}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSave={updateTask}
        onDelete={deleteTask}
      />
    </div>
  );
}