// import React, { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import { Calendar } from "@/components/ui/calendar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select"

// function MeetSchedule() {
//   const { username } = useParams()
//   const [selectedDate, setSelectedDate] = useState(null)
//   const [selectedTime, setSelectedTime] = useState("")
//   const [schedulerName, setSchedulerName] = useState("")
//   const [schedulerEmail, setSchedulerEmail] = useState("")
//   const [meetingPurpose, setMeetingPurpose] = useState("")
//   const [note, setNote] = useState("")

//   const [attendeeInfo, setAttendeeInfo] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     async function fetchAttendee() {
//       try {
//         const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/by-username/${username}`)
//         const data = await res.json()

//         if (res.ok) {
//           setAttendeeInfo(data.data)
//         } else {
//           setError(data.message || "Invalid scheduling link")
//         }
//       } catch (err) {
//         setError("Something went wrong while fetching attendee info")
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchAttendee()
//   }, [username])

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!selectedDate || !selectedTime || !meetingPurpose || !schedulerName || !schedulerEmail) {
//       alert("Please fill all required fields")
//       return
//     }

//     const [hours, minutes] = selectedTime.split(":")
//     const combinedDate = new Date(selectedDate)
//     combinedDate.setHours(hours, minutes, 0, 0)

//     const meetingData = {
//       attendeeUserId: attendeeInfo._id,
//       attendeeName: attendeeInfo.name,
//       attendeeEmail: attendeeInfo.email,
//       schedulerName,
//       schedulerEmail,
//       utcTime: combinedDate.toISOString(),
//       meetingPurpose,
//       note,
//       meetingDuration: 30,
//     }

//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/meetings/schedule`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify(meetingData),
//       })

//       const data = await res.json()

//       if (res.ok) {
//         alert("Meeting scheduled successfully!")
//         setSelectedDate(null)
//         setSelectedTime("")
//         setSchedulerName("")
//         setSchedulerEmail("")
//         setMeetingPurpose("")
//         setNote("")
//       } else {
//         alert(data.message || "Failed to schedule meeting")
//       }
//     } catch (err) {
//       console.error("Error:", err)
//       alert("Something went wrong. Try again.")
//     }
//   }

//   if (loading) return <p className="text-center mt-20">Loading attendee info...</p>
//   if (error) return <p className="text-center mt-20 text-red-500">{error}</p>

//   return (
//     <div className="min-h-screen bg-muted flex flex-col items-center px-4 py-12">
//       <style>
//         {`
//           .custom-calendar [aria-selected="true"] {
//             background-color: #3b82f6 !important;
//             color: white !important;
//             border-radius: 6px !important;
//             font-weight: 600 !important;
//             box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3) !important;
//             transform: scale(1.05) !important;
//           }

//           .custom-calendar [aria-selected="true"]:hover {
//             background-color: #2563eb !important;
//             color: white !important;
//           }

//           .custom-calendar button[aria-selected="true"] {
//             position: relative;
//           }

//           .custom-calendar button[aria-selected="true"]::after {
//             content: '';
//             position: absolute;
//             top: -2px;
//             left: -2px;
//             right: -2px;
//             bottom: -2px;
//             border: 2px solid #3b82f6;
//             border-radius: 8px;
//             pointer-events: none;
//           }
//         `}
//       </style>
//       <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 space-y-8">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold tracking-tight">Schedule a Meeting with {attendeeInfo.name}</h1>
//           <p className="text-muted-foreground text-sm mt-2">Fill the details below</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <Label>Full Name</Label>
//             <Input
//               type="text"
//               value={schedulerName}
//               onChange={(e) => setSchedulerName(e.target.value)}
//               required
//               placeholder="Your name"
//               className="mt-1"
//             />
//           </div>

//           <div>
//             <Label>Email</Label>
//             <Input
//               type="email"
//               value={schedulerEmail}
//               onChange={(e) => setSchedulerEmail(e.target.value)}
//               required
//               placeholder="your@email.com"
//               className="mt-1"
//             />
//           </div>

//           <div>
//             <Label>Pick a Date</Label>
//             {selectedDate && (
//               <p className="text-sm text-blue-600 font-medium mt-1">
//                 Selected: {selectedDate.toLocaleDateString()}
//               </p>
//             )}
//             <div className="rounded-md border mt-2">
//               <Calendar
//                 mode="single"
//                 selected={selectedDate}
//                 onSelect={(date) => {
//                   setSelectedDate(date instanceof Date ? date : null)
//                   console.log("Date selected:", date)
//                 }}
//                 className="rounded-md border custom-calendar"
//               />
//             </div>
//           </div>

//           <div>
//             <Label>Select Time</Label>
//             <Input
//               type="time"
//               className="w-full mt-2"
//               value={selectedTime}
//               onChange={(e) => setSelectedTime(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <Label>Meeting Purpose</Label>
//             <Select value={meetingPurpose} onValueChange={setMeetingPurpose}>
//               <SelectTrigger className="w-full mt-2">
//                 <SelectValue placeholder="Choose purpose" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="work">Work</SelectItem>
//                 <SelectItem value="personal">Personal</SelectItem>
//                 <SelectItem value="friends">Friends</SelectItem>
//                 <SelectItem value="freelance">Freelance</SelectItem>
//                 <SelectItem value="other">Other</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <Label>Optional Note</Label>
//             <Textarea
//               placeholder="Add a message or context..."
//               className="w-full mt-2"
//               rows={3}
//               value={note}
//               onChange={(e) => setNote(e.target.value)}
//             />
//           </div>

//           <Button type="submit" className="w-full mt-4">
//             Schedule Meeting
//           </Button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default MeetSchedule

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

function MeetSchedule() {
  const { username } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [bookedTimes, setBookedTimes] = useState([]);

  const [schedulerName, setSchedulerName] = useState("");
  const [schedulerEmail, setSchedulerEmail] = useState("");
  const [meetingPurpose, setMeetingPurpose] = useState("");
  const [note, setNote] = useState("");

  const [attendeeInfo, setAttendeeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch attendee info once
  useEffect(() => {
    async function fetchAttendee() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/by-username/${username}`
        );
        const data = await res.json();
        if (res.ok) setAttendeeInfo(data.data);
        else setError(data.message || "Invalid scheduling link");
      } catch {
        setError("Something went wrong while fetching attendee info");
      } finally {
        setLoading(false);
      }
    }
    fetchAttendee();
  }, [username]);

  // When the date changes: fetch booked slots and compute available slots
  useEffect(() => {
    if (!selectedDate || !attendeeInfo) return;

    const dateStr = selectedDate.toISOString().split("T")[0];
    fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/meetings/by-date/${dateStr}?user=${attendeeInfo._id}`,
      { credentials: "include" }
    )
      .then((res) => res.json())
      .then(({ data, message }) => {
        if (data) {
          const booked = data.map((iso) => {
            const d = new Date(iso);
            return `${String(d.getHours()).padStart(2, "0")}:${String(
              d.getMinutes()
            ).padStart(2, "0")}`;
          });
          setBookedTimes(booked);
        } else {
          console.error(message);
        }
      })
      .catch((e) => console.error(e));

    // Create 30-min slots from 08:00 to 18:00
    const slots = [];
    for (let hour = 8; hour <= 17; hour++) {
      ["00", "30"].forEach((mm) => {
        slots.push(`${String(hour).padStart(2, "0")}:${mm}`);
      });
    }
    setAvailableTimes(slots);
  }, [selectedDate, attendeeInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !selectedDate ||
      !selectedTime ||
      !meetingPurpose ||
      !schedulerName ||
      !schedulerEmail
    ) {
      alert("Please fill all required fields");
      return;
    }

    const [hours, minutes] = selectedTime.split(":");
    const dt = new Date(selectedDate);
    dt.setHours(hours, minutes, 0, 0);

    const meetingData = {
      attendeeUserId: attendeeInfo._id,
      attendeeName: attendeeInfo.name,
      attendeeEmail: attendeeInfo.email,
      schedulerName,
      schedulerEmail,
      utcTime: dt.toISOString(),
      meetingPurpose,
      note,
      meetingDuration: 30,
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/meetings/schedule`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(meetingData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Meeting scheduled successfully!");
        setSelectedDate(null);
        setSelectedTime("");
        setSchedulerName("");
        setSchedulerEmail("");
        setMeetingPurpose("");
        setNote("");
      } else {
        alert(data.message || "Failed to schedule meeting");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Try again.");
    }
  };


  if (loading) return (
    <motion.div
      className="min-h-screen bg-gray-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.p
        className="text-center mt-20 text-gray-600"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        Loading attendee info...
      </motion.p>
    </motion.div>
  );

  if (error) return (
    <motion.div
      className="min-h-screen bg-gray-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.p
        className="text-center mt-20 text-red-500"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {error}
      </motion.p>
    </motion.div>
  );

  return (
    <motion.div
      className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-6 sm:py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Schedule a Meeting with {attendeeInfo.name}
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Label htmlFor="name" className="text-gray-700 font-medium">
              Your Name *
            </Label>
            <Input
              id="name"
              type="text"
              value={schedulerName}
              onChange={(e) => setSchedulerName(e.target.value)}
              className="mt-2 border-gray-300 focus:border-black focus:ring-black"
              placeholder="Enter your name"
              required
            />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Your Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={schedulerEmail}
              onChange={(e) => setSchedulerEmail(e.target.value)}
              className="mt-2 border-gray-300 focus:border-black focus:ring-black"
              placeholder="Enter your email"
              required
            />
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <Label className="text-gray-700 font-medium">Pick a Date</Label>
            <AnimatePresence>
              {selectedDate && (
                <motion.p
                  className="text-sm text-gray-600 font-medium mt-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  Selected: {selectedDate.toLocaleDateString()}
                </motion.p>
              )}
            </AnimatePresence>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) =>
                  setSelectedDate(date instanceof Date ? date : null)
                }
                className="rounded border custom-calendar mt-2"
              />
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Label className="text-gray-700 font-medium">Select Time</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger className="w-full mt-2 border-gray-300 focus:border-black focus:ring-black">
                    <SelectValue placeholder="Choose time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimes.map((t) => (
                      <SelectItem key={t} value={t} disabled={bookedTimes.includes(t)}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {bookedTimes.length > 0 && (
                  <motion.p
                    className="text-sm text-red-500 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <strong>Booked slots:</strong> {bookedTimes.map(time => {
                      const [h, m] = time.split(":");
                      const hour = parseInt(h);
                      const isPM = hour >= 12;
                      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
                      const ampm = isPM ? "PM" : "AM";
                      return `${formattedHour}:${m}${ampm}`;
                    }).join(", ")}
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            <Label htmlFor="purpose" className="text-gray-700 font-medium">
              Meeting Purpose *
            </Label>
            <Select value={meetingPurpose} onValueChange={setMeetingPurpose}>
              <SelectTrigger className="w-full mt-2 border-gray-300 focus:border-black focus:ring-black">
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
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.9 }}
          >
            <Label htmlFor="notes" className="text-gray-700 font-medium">
              Additional Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-2 border-gray-300 focus:border-black focus:ring-black resize-none"
              placeholder="Any additional information or special requirements"
              rows={3}
            />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.0 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1 }}
            >
              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
              >
                Schedule Meeting
              </Button>
            </motion.div>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
}

export default MeetSchedule;