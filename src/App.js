import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Notes from './Notes';

export default function App() {
  return (
    <Routes>
      {/* Redirect root path to /login */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/notes" element={<Notes />} />
    </Routes>
  );
}
