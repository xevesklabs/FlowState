import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout.jsx';
import { Tasks } from './pages/Tasks';
import { Notes } from './pages/Notes'; // Import the newly created Notes page

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/tasks" replace />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="habits" element={<div style={{ color: 'var(--text-secondary)' }}>Habits module pending...</div>} />
          <Route path="pomodoro" element={<div style={{ color: 'var(--text-secondary)' }}>Pomodoro module pending...</div>} />
          {/* Replace the pending div with the Notes component */}
          <Route path="notes" element={<Notes />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}