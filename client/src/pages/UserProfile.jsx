import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function UserProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    timezone: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ✅ Correct endpoint: /current-user
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/current-user`, {
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok) {
          setFormData({
            name: data.data.name || "",
            email: data.data.email || "",
            username: data.data.username || "",
            timezone: data.data.timezone || "",
          });
        } else {
          setError(data.message || "Failed to fetch user data");
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ Correct endpoint: PATCH /update-account
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/update-account`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Profile updated successfully!");
        setError("");
      } else {
        setError(data.message || "Failed to update profile");
        setMessage("");
      }
    } catch (err) {
      setError("Something went wrong");
      setMessage("");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-muted flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 space-y-8">
        <h1 className="text-4xl font-bold text-center">Edit Profile</h1>

        {message && <p className="text-green-600 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>Name</Label>
            <Input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label>Username</Label>
            <Input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label>Timezone</Label>
            <Input
              name="timezone"
              type="text"
              value={formData.timezone}
              onChange={handleChange}
              required
              className="mt-1"
              placeholder="e.g. Asia/Kolkata"
            />
          </div>

          <Button type="submit" className="w-full mt-4">
            Update Profile
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
