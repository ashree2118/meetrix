import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

function Register() {
  const [formData, setFormData] = useState({
    name: "",
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
        Navigate("/login")
      } else {
        alert(data.message || "Failed to register")
      }
    } catch (err) {
      alert("Something went wrong")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <div>
          <Label htmlFor="name">Name</Label>
          <Input name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" value={formData.password} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="timezone">Timezone</Label>
          <Input name="timezone" value={formData.timezone} onChange={handleChange} required  />
        </div>

        <Button type="submit" className="w-full">Register</Button>
      </form>
    </div>
  )
}

export default Register
