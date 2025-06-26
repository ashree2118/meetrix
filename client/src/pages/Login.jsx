import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

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
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" value={formData.password} onChange={handleChange} required />
        </div>

        <Button type="submit" className="w-full">Login</Button>
      </form>
      {/* Redirect handled in handleSubmit with navigate("/dashboard") */}
    </div>
  )
}

export default Login