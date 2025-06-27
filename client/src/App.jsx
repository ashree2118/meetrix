import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import MeetSchedule from './pages/MeetSchedule.jsx';
import Login from './pages/Login.jsx';
import UserProfile from './pages/UserProfile.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import Register from './pages/Register.jsx';


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
