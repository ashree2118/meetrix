import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true) // Start loader

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        alert("Login successful!")
        navigate("/dashboard")
      } else {
        alert(data.message || "Login failed")
      }
    } catch (err) {
      alert("Something went wrong")
    } finally {
      setLoading(false) // Stop loader
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
          </motion.video>
        </div>
        <div className="absolute inset-0 bg-black/30"></div>
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
            Welcome Back
          </motion.h1>
          <motion.p
            className="text-xl text-gray-200 text-center max-w-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Continue your journey with Meetrix
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Right Side - Login Form */}
      <motion.div
        className=" lg:w-1/2 w-full flex items-center justify-center bg-white p-8 lg:p-16"
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
          <motion.div
            className="lg:hidden text-center mb-8"
            variants={itemVariants}
          >
            <h1 className="text-3xl font-bold text-black">Meetrix</h1>
            <div className="w-16 h-1 bg-black mx-auto mt-2 rounded-full"></div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-black mb-2">Login</h2>
            <p className="text-gray-600 mb-8">Hey, Welcome back to your Meetrix account</p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 border-gray-300 focus:border-black focus:ring-black transition-colors duration-200"
                placeholder="Enter your email"
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
                placeholder="Enter your password"
              />
              <motion.div className="text-right mt-2"></motion.div>
            </motion.div>

            <motion.div className="text-right mt-2 mb-16" variants={itemVariants}>
              <a
                href="/forgot-password"
                className="text-sm text-black hover:underline"
              >
                Forgot password?
              </a>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.div whileHover={!loading ? { scale: 1.02 } : {}} whileTap={!loading ? { scale: 0.98 } : {}}>
                <Button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-black hover:bg-gray-800 text-white py-3 text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
                >
                  {loading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      />
                      Logging in...
                    </motion.div>
                  ) : (
                    "Login"
                  )}
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="text-center pt-4"
              variants={itemVariants}
            >
              <span className="text-gray-600">Don't have an account? </span>
              <motion.a
                href="/register"
                className="text-black font-semibold hover:underline transition-all duration-200"
                whileHover={{ scale: 1.05 }}
              >
                Sign up
              </motion.a>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Login