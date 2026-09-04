import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { CheckSquare, Activity, Timer, FileText, LayoutDashboard } from 'lucide-react';

export function Layout() {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
    { to: '/habits', icon: Activity, label: 'Habits' },
    { to: '/pomodoro', icon: Timer, label: 'Pomodoro' },
    { to: '/notes', icon: FileText, label: 'Notes' },
  ];

  return (
    <div className="app-container">
      <nav className="sidebar">
        <div className="sidebar-header">
          Flow<br/>
          <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>State.</span>
        </div>
        
        <div className="nav-links">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={16} strokeWidth={1.5} />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      <main className="main-content">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}