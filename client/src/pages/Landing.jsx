import React from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      
        <nav className="w-full bg-white shadow mb-8">
  <ul className="flex justify-center space-x-6 py-4">
    <li><Link to="/" className="hover:text-blue-600 font-medium">Home</Link></li>
    <li><Link to="/login" className="hover:text-blue-600 font-medium">Login</Link></li>
    <li><Link to="/register" className="hover:text-blue-600 font-medium">Register</Link></li>
    <li><Link to="/user-profile" className="hover:text-blue-600 font-medium">Profile</Link></li>
    <li><Link to="/user-dashboard" className="hover:text-blue-600 font-medium">Dashboard</Link></li>
    <li><Link to="/schedule/:username" className="hover:text-blue-600 font-medium">Schedule</Link></li>
  </ul>
</nav>

      <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-center py-4">
        Meetrix
      </h1>
      <p className="text-base sm:text-lg md:text-xl mb-8 text-center max-w-xl">
        Welcome to the Meetrix platform, where collaboration meets innovation.
      </p>
      <Button>
        Create Profile
      </Button>
    </div>
  )
}

export default Landing;
