import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout.jsx';
import { Tasks } from './pages/Tasks';
import { Notes } from './pages/Notes';
import { Pomodoro } from './pages/Pomodoro';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/tasks" replace />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="habits" element={<div style={{ color: 'var(--text-secondary)' }}>Habits module pending...</div>} />
          <Route path="pomodoro" element={<Pomodoro />} />
          <Route path="notes" element={<Notes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}