import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import MeetSchedule from './pages/MeetSchedule';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import UserDashboard from './pages/UserDashboard';
import Register from './pages/Register';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/schedule/:username" element={<MeetSchedule />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/dashboard" element={<UserDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
