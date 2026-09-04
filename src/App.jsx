import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout.jsx';
import { Tasks } from './pages/Tasks';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={() => <Layout />}>
          {/* We use standard nested routing with Outlet in Layout */}
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/tasks" replace />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="habits" element={<div style={{ color: 'var(--text-secondary)' }}>Habits module pending...</div>} />
          <Route path="pomodoro" element={<div style={{ color: 'var(--text-secondary)' }}>Pomodoro module pending...</div>} />
          <Route path="notes" element={<div style={{ color: 'var(--text-secondary)' }}>Notes module pending...</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}