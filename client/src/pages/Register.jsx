// import React, { useState } from "react"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { useNavigate } from "react-router-dom"

// function Register() {
//   const [formData, setFormData] = useState({
//     name: "",
//     username: "",
//     email: "",
//     password: "",
//     timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
//   })

//   const navigate = useNavigate()

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(formData),
//       })

//       const data = await res.json()

//       if (res.ok) {
//         alert("Registered successfully!")
//         navigate("/login")  // ✅ fixed `Navigate` to `navigate`
//       } else {
//         alert(data.message || "Failed to register")
//       }
//     } catch (err) {
//       alert("Something went wrong")
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6">
//         <h2 className="text-2xl font-bold text-center">Register</h2>

//         <div>
//           <Label htmlFor="name">Name</Label>
//           <Input name="name" value={formData.name} onChange={handleChange} required />
//         </div>

//         <div>
//           <Label htmlFor="username">Username</Label>
//           <Input name="username" value={formData.username} onChange={handleChange} required placeholder="Unique URL name" />
//         </div>

//         <div>
//           <Label htmlFor="email">Email</Label>
//           <Input name="email" type="email" value={formData.email} onChange={handleChange} required />
//         </div>

//         <div>
//           <Label htmlFor="password">Password</Label>
//           <Input name="password" type="password" value={formData.password} onChange={handleChange} required />
//         </div>

//         <div>
//           <Label htmlFor="timezone">Timezone</Label>
//           <Input name="timezone" value={formData.timezone} onChange={handleChange} required />
//         </div>

//         <Button type="submit" className="w-full">Register</Button>
//       </form>
//     </div>
//   )
// }


// export default Register


import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        alert("Registered successfully!")
        navigate("/login")
      } else {
        alert(data.message || "Failed to register")
      }
    } catch (err) {
      alert("Something went wrong")
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  const videoVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  const formVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Video Section */}
      <motion.div 
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden"
        variants={videoVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Video Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <source src="https://www.midjourney.com/jobs/572d0335-91dc-4d47-bc3c-9d189bd9b98e?index=0" type="video/mp4" />
            {/* Fallback content */}
          </motion.video>
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Content Overlay */}
        <motion.div 
          className="relative z-10 flex flex-col justify-center items-center text-white p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1 
            className="text-5xl font-bold mb-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Join Meetrix
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-200 text-center max-w-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Start your scheduling journey today
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Right Side - Register Form */}
      <motion.div 
        className="w-full lg:w-1/2 flex items-center justify-center bg-white px-4 py-8"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo/Brand for mobile */}
          <motion.div 
            className="lg:hidden text-center mb-8"
            variants={itemVariants}
          >
            <h1 className="text-3xl font-bold text-black">Meetrix</h1>
            <div className="w-16 h-1 bg-black mx-auto mt-2 rounded-full"></div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-black mb-2">Create Account</h2>
            <p className="text-gray-600 mb-8">Start your scheduling journey with Meetrix</p>
          </motion.div>

          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Label htmlFor="name" className="text-gray-700 font-medium">Full Name</Label>
              <Input 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                className="mt-1 border-gray-300 focus:border-black focus:ring-black transition-colors duration-200"
                placeholder="Enter your full name"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Label htmlFor="username" className="text-gray-700 font-medium">Username</Label>
              <Input 
                name="username" 
                value={formData.username} 
                onChange={handleChange} 
                required 
                className="mt-1 border-gray-300 focus:border-black focus:ring-black transition-colors duration-200"
                placeholder="Choose a unique username"
              />
              <p className="text-sm text-gray-500 mt-1">This will be your unique URL identifier</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
              <Input 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                className="mt-1 border-gray-300 focus:border-black focus:ring-black transition-colors duration-200"
                placeholder="Enter your email address"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
              <Input 
                name="password" 
                type="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
                className="mt-1 border-gray-300 focus:border-black focus:ring-black transition-colors duration-200"
                placeholder="Create a strong password"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Label htmlFor="timezone" className="text-gray-700 font-medium">Timezone</Label>
              <Input 
                name="timezone" 
                value={formData.timezone} 
                onChange={handleChange} 
                required 
                className="mt-1 border-gray-300 focus:border-black focus:ring-black transition-colors duration-200"
                placeholder="Your timezone"
              />
              <p className="text-sm text-gray-500 mt-1">Auto-detected based on your location</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  type="submit" 
                  className="w-full bg-black hover:bg-gray-800 text-white py-3 text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Create Account
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="text-center pt-4"
              variants={itemVariants}
            >
              <span className="text-gray-600">Already have an account? </span>
              <motion.a 
                href="/login" 
                className="text-black font-semibold hover:underline transition-all duration-200"
                whileHover={{ scale: 1.05 }}
              >
                Sign in
              </motion.a>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Register