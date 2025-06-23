import React, { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

import "react-day-picker/dist/style.css"

function MeetSchedule() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState("")
  const [schedulerName, setSchedulerName] = useState("")
  const [schedulerEmail, setSchedulerEmail] = useState("")
  const [meetingPurpose, setMeetingPurpose] = useState("")
  const [note, setNote] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedDate || !selectedTime || !meetingPurpose || !schedulerName || !schedulerEmail) {
      alert("Please fill all required fields")
      return
    }

    const [hours, minutes] = selectedTime.split(":")
    const combinedDate = new Date(selectedDate)
    combinedDate.setHours(hours, minutes, 0, 0)

    const meetingData = {
      schedulerName,
      schedulerEmail,
      utcTime: combinedDate.toISOString(),
      meetingPurpose,
      note,
      meetingDuration: 30,
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/meeting/schedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(meetingData),
      })

      const data = await res.json()

      if (res.ok) {
        alert("Meeting scheduled successfully!")
        setSelectedDate(null)
        setSelectedTime("")
        setSchedulerName("")
        setSchedulerEmail("")
        setMeetingPurpose("")
        setNote("")
      } else {
        alert(data.message || "Failed to schedule meeting")
      }
    } catch (err) {
      console.error("Error:", err)
      alert("Something went wrong. Try again.")
    }
  }

  return (
    <div className="min-h-screen bg-muted flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Schedule a Meeting</h1>
          <p className="text-muted-foreground text-sm mt-2">Fill the details below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>Full Name</Label>
            <Input
              type="text"
              value={schedulerName}
              onChange={(e) => setSchedulerName(e.target.value)}
              required
              placeholder="Your name"
              className="mt-1"
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={schedulerEmail}
              onChange={(e) => setSchedulerEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="mt-1"
            />
          </div>

          <div>
            <Label>Pick a Date</Label>
            <div className="rounded-md border mt-2">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </div>
          </div>

          <div>
            <Label>Select Time</Label>
            <Input
              type="time"
              className="w-full mt-2"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Meeting Purpose</Label>
            <Select value={meetingPurpose} onValueChange={setMeetingPurpose}>
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Choose purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="friends">Friends</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Optional Note</Label>
            <Textarea
              placeholder="Add a message or context..."
              className="w-full mt-2"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full mt-4">
            Schedule Meeting
          </Button>
        </form>
      </div>
    </div>
  )
}

export default MeetSchedule
