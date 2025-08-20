import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import MeetSchedule from './pages/MeetSchedule.jsx';
import UserProfile from './pages/UserProfile.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import Register from './pages/Register.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import NotFound from './pages/NotFound.jsx';


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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
