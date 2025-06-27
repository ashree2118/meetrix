import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing.jsx';
import Login from './pages/login.jsx';
import MeetSchedule from './pages/meetSchedule.jsx';
import UserProfile from './pages/userProfile.jsx';
import UserDashboard from './pages/userDashboard.jsx';
import Register from './pages/register.jsx';


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
