import React from 'react'
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'
import { Calendar } from '@/components/ui/calendar'
import meetrix_logo from '../assets/meetrix_logo.svg'

function Landing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const features = [
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      title: "Unique Scheduling Link",
      description: "Share your personalized scheduling link with anyone to let them book meetings with you.",
      bgColor: "bg-black"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Meeting Dashboard",
      description: "View and manage all your scheduled meetings in one comprehensive dashboard.",
      bgColor: "bg-gray-700"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Color-Coded Calendar",
      description: "Organize meetings with color-coded categories for different purposes and priorities.",
      bgColor: "bg-gray-800"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email Notifications",
      description: "Get automatic email notifications for every scheduled meeting and important updates.",
      bgColor: "bg-gray-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Enhanced Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            
            <motion.a 
              href="/" 
              className="text-2xl  inline-flex items-center hover:scale-105 transition-transform duration-300"
              transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <img className='py-1 mx-2 w-8' src={meetrix_logo} alt="/" />
              <h1 className="text-2xl font-bold text-black">Meetrix</h1>
            </motion.a>
        
            {/* Auth Buttons */}
            <div className="flex space-x-3">
              <motion.a 
                href="/login"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" className="hover:bg-gray-50 border-gray-300 text-gray-700 hover:text-black transition-all duration-200">
                  Login
                </Button>
              </motion.a>
              <motion.a 
                href="/register"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-black hover:bg-gray-800 text-white shadow-md hover:shadow-lg transition-all duration-200">
                  Register
                </Button>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-4 py-20">
        {/* Main Title */}
        <motion.div 
          className="text-center mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-black"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Meetrix
          </motion.h1>
          <motion.div 
            className="w-24 h-1 bg-black mx-auto rounded-full mb-8"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          ></motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.p 
          className="text-lg sm:text-xl md:text-2xl mb-12 text-center max-w-3xl text-gray-600 leading-relaxed"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Where <span className="font-semibold text-black">collaboration</span> meets <span className="font-semibold text-gray-800">innovation</span>. 
          Build meaningful connections and streamline your meeting experience.
        </motion.p>

        {/* CTA Button */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 items-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.a 
            href="/register"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              Create Your Profile
            </Button>
          </motion.a>
          <motion.a 
            href="/login"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button variant="outline" size="lg" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold transition-all duration-200">
              Sign In
            </Button>
          </motion.a>
        </motion.div>

        {/* Feature Cards - 2x2 grid for large screens, single column for mobile */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16 max-w-4xl w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
            >
              <motion.div 
                className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}
                whileHover={{ rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-black mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
        <footer className="mt-16 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} developed with 🖤 by Anushree | All rights reserved @Meetrix.
          </footer>
      </div>
    </div>
  )
}

export default Landing;