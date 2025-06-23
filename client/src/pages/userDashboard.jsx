import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"
import { Copy, Check } from "lucide-react"

function UserDashboard() {
  const [meetingsByDate, setMeetingsByDate] = useState({})
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [user, setUser] = useState(null)
  const [copied, setCopied] = useState(false)

  const fetchMeetings = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/meetings/grouped`, {
        method: "GET",
        credentials: "include",
      })
      const data = await res.json()
      if (res.ok) {
        const grouped = {}
        data.data.forEach((group) => {
          grouped[group._id] = group.meetings
        })
        setMeetingsByDate(grouped)
      }
    } catch (error) {
      console.error("Error fetching meetings:", error)
    }
  }

  const fetchUser = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/current-user`, {
        method: "GET",
        credentials: "include",
      })
      const data = await res.json()
      if (res.ok) {
        setUser(data.data)
      }
    } catch (error) {
      console.error("Failed to fetch user info")
    }
  }

  useEffect(() => {
    fetchUser()
    fetchMeetings()
  }, [])

  const handleCopy = async () => {
    if (user?.profileLink) {
      await navigator.clipboard.writeText(user.profileLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formattedDate = format(selectedDate, "yyyy-MM-dd")
  const meetingsToday = meetingsByDate[formattedDate] || []

  const getColor = (purpose) => {
    switch (purpose) {
      case "work": return "bg-blue-500"
      case "personal": return "bg-green-500"
      case "friends": return "bg-pink-500"
      case "freelance": return "bg-yellow-500"
      default: return "bg-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">Your Dashboard</h1>

        {user && (
          <div className="text-center mb-8">
            <p className="text-lg font-medium">Your Profile Link:</p>
            <div className="mt-2 flex justify-center items-center gap-2 bg-white border rounded-md p-2 px-4 shadow-sm">
              <span className="truncate text-sm text-blue-600 max-w-[250px]">{user.profileLink}</span>
              <Button variant="ghost" size="icon" onClick={handleCopy}>
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            {copied && (
              <p className="text-xs text-green-600 mt-1">Link copied to clipboard!</p>
            )}
          </div>
        )}

        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <Calendar selected={selectedDate} onSelect={setSelectedDate} className="mx-auto" />
        </div>

        <h2 className="text-2xl font-semibold mb-4">Meetings on {formattedDate}</h2>

        {meetingsToday.length > 0 ? (
          <div className="space-y-4">
            {meetingsToday.map((meeting) => (
              <Card key={meeting._id} className="shadow-sm">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium capitalize">{meeting.meetingPurpose}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(meeting.utcTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                    {meeting.note && <p className="text-sm mt-1 italic text-gray-600">{meeting.note}</p>}
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getColor(meeting.meetingPurpose)}`} />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No meetings scheduled for this day.</p>
        )}
      </div>
    </div>
  )
}

export default UserDashboard
