import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout.jsx';
import { Tasks } from './pages/Tasks.jsx';
import { Notes } from './pages/Notes.jsx';
import { Pomodoro } from './pages/Pomodoro.jsx';
import { Habits } from './pages/Habits.jsx'; // Import the new Habits module

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/tasks" replace />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="habits" element={<Habits />} /> {/* Replaced placeholder */}
          <Route path="pomodoro" element={<Pomodoro />} />
          <Route path="notes" element={<Notes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}