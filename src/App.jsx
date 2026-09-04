import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/tasks" replace />} />
          <Route path="tasks" element={<div style={{ color: 'white' }}>Tasks module pending...</div>} />
          <Route path="habits" element={<div style={{ color: 'white' }}>Habits module pending...</div>} />
          <Route path="pomodoro" element={<div style={{ color: 'white' }}>Pomodoro module pending...</div>} />
          <Route path="notes" element={<div style={{ color: 'white' }}>Notes module pending...</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}