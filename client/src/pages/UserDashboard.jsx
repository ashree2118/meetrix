import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Copy, Check } from "lucide-react";

function UserDashboard() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [meetingsByDate, setMeetingsByDate] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [user, setUser] = useState(null);
  const [copied, setCopied] = useState(false);

  // Fetch current logged-in user
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/current-user`, {
      method: "GET",
      credentials: "include",
    })
      .then(res => res.json().then(data => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) throw new Error(data.message || "Auth failed");
        setUser({
          ...data.data,
          profileLink: `${window.location.origin}/schedule/${data.data.username}`,
        });
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  // Once user loaded, verify route and fetch meetings
  useEffect(() => {
    if (user) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/meetings/grouped`, {
        method: "GET",
        credentials: "include",
      })
        .then(res => res.json().then(data => ({ ok: res.ok, data })))
        .then(({ ok, data }) => {
          if (!ok) throw new Error(data.message);
          const grouped = {};
          data.data.forEach(group => { grouped[group._id] = group.meetings; });
          setMeetingsByDate(grouped);
        })
        .catch(err => console.error("Failed to fetch meetings:", err));
    }
  }, [user, username, navigate]);

  const handleCopy = () => {
    if (!user?.profileLink) return;
    navigator.clipboard.writeText(user.profileLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedKey = format(selectedDate, "yyyy-MM-dd");
  const meetingsToday = meetingsByDate[selectedKey] || [];

  const getColor = purpose => ({
    work: "bg-pink-200",
    personal: "bg-green-200",
    friends: "bg-yellow-200",
    freelance: "bg-purple-200"
  }[purpose] || "bg-gray-200");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const cardVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-6 sm:py-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto">
        <motion.button
          className="absolute top-0 right-0 mt-2 mr-2 sm:mt-4 sm:mr-4 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors z-10"
          whileHover={{ scale: 1.08, boxShadow: "0 6px 24px rgba(37, 99, 235, 0.18)" }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/user-profile")}
        >
          Profile
        </motion.button>
        <motion.h1 
          className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-6 sm:mb-8 lg:mb-10 text-gray-900"
          variants={itemVariants}
        >
          {user?.name}'s Dashboard
        </motion.h1>

        {user && (
          <motion.div 
            className="text-center mb-8 sm:mb-10 lg:mb-12"
            variants={itemVariants}
          >
            <p className="font-medium text-gray-700 text-sm sm:text-base mb-3">
              Share your Scheduling Link:
            </p>
            <motion.div 
              className="mt-2 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 bg-white border border-gray-300 rounded-lg p-3 sm:p-4 shadow-sm mx-auto max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)"
              }}
              transition={{ duration: 0.2 }}
            >
              <span className="truncate text-gray-800 max-w-[200px] sm:max-w-[300px] lg:max-w-none break-all text-xs sm:text-sm lg:text-base">
                {user.profileLink}
              </span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleCopy} 
                className="hover:bg-gray-100 shrink-0"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Check className="w-4 h-4 text-green-600" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Copy className="w-4 h-4 text-gray-700" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
            <AnimatePresence>
              {copied && (
                <motion.p 
                  className="text-green-600 mt-2 font-medium text-sm"
                  initial={{ opacity: 0, y: -10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  Link copied to clipboard!
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <motion.div 
            className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-gray-200"
            variants={itemVariants}
            whileHover={{ 
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              y: -2
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.h2 
              className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6 text-gray-900 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Schedule Calendar
            </motion.h2>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Calendar
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="w-full flex justify-center"
                modifiers={{
                  work: Object.entries(meetingsByDate)
                    .filter(([date, ms]) => ms.some(m => m.meetingPurpose === "work"))
                    .map(([d]) => new Date(d)),
                  personal: Object.entries(meetingsByDate)
                    .filter(([_, ms]) => ms.some(m => m.meetingPurpose === "personal"))
                    .map(([d]) => new Date(d)),
                  friends: Object.entries(meetingsByDate)
                    .filter(([_, ms]) => ms.some(m => m.meetingPurpose === "friends"))
                    .map(([d]) => new Date(d)),
                  freelance: Object.entries(meetingsByDate)
                    .filter(([_, ms]) => ms.some(m => m.meetingPurpose === "freelance"))
                    .map(([d]) => new Date(d)),
                  other: Object.entries(meetingsByDate)
                    .filter(([_, ms]) =>
                      ms.every(m =>
                        !["work","personal","friends","freelance"].includes(m.meetingPurpose)
                      )
                    ).map(([d]) => new Date(d)),
                }}
                modifiersClassNames={{
                  work: "bg-pink-200 text-pink-800 font-semibold hover:bg-pink-300 transition-colors",
                  personal: "bg-green-200 text-green-800 font-semibold hover:bg-green-300 transition-colors",
                  friends: "bg-yellow-200 text-yellow-800 font-semibold hover:bg-yellow-300 transition-colors",
                  freelance: "bg-purple-200 text-purple-800 font-semibold hover:bg-purple-300 transition-colors",
                  other: "bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition-colors",
                }}
              />
            </motion.div>
          </motion.div>

          <motion.div 
            className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-gray-200"
            variants={itemVariants}
            whileHover={{ 
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              y: -2
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.h2 
              className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6 text-gray-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Meetings on {format(selectedDate, "MMMM d, yyyy")}
            </motion.h2>
            
            <motion.div
              className="space-y-3 sm:space-y-4 max-h-96 lg:max-h-[500px] overflow-y-auto pr-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <AnimatePresence>
                {meetingsToday.length ? (
                  meetingsToday.map((meeting, index) => (
                    <motion.div
                      key={meeting._id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ delay: index * 0.1 }}
                      layout
                    >
                      <Card className="shadow-md border border-gray-200 hover:border-gray-300 transition-all duration-200">
                        <CardContent className="flex justify-between items-center p-4 sm:p-5">
                          <div className="flex-1 min-w-0">
                            <motion.p 
                              className="text-base sm:text-lg font-medium capitalize text-gray-900 truncate"
                              whileHover={{ scale: 1.02 }}
                            >
                              {meeting.meetingPurpose}
                            </motion.p>
                            <motion.p 
                              className="text-sm text-gray-500 mt-1"
                              initial={{ opacity: 0.7 }}
                              animate={{ opacity: 1 }}
                            >
                              {new Date(meeting.utcTime).toLocaleTimeString([], { 
                                hour: "2-digit", 
                                minute: "2-digit",
                                hour12: true
                              })}
                            </motion.p>
                          </div>
                          <motion.div 
                            className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full ${getColor(meeting.meetingPurpose)} ml-3 shrink-0`}
                            whileHover={{ 
                              scale: 1.3,
                              rotate: 360
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-8 sm:py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <span className="text-2xl sm:text-3xl">📅</span>
                    </motion.div>
                    <p className="text-gray-500 text-base sm:text-lg">
                      No meetings scheduled for this day
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Enjoy your free time!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-8 sm:mt-12 text-center"
          variants={itemVariants}
        >
          <motion.div 
            className="inline-flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.span 
              className="flex items-center gap-1 sm:gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-3 h-3 bg-pink-200 rounded-full"></div>
              Work
            </motion.span>
            <motion.span 
              className="flex items-center gap-1 sm:gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-3 h-3 bg-green-200 rounded-full"></div>
              Personal
            </motion.span>
            <motion.span 
              className="flex items-center gap-1 sm:gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-3 h-3 bg-yellow-200 rounded-full"></div>
              Friends
            </motion.span>
            <motion.span 
              className="flex items-center gap-1 sm:gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-3 h-3 bg-purple-200 rounded-full"></div>
              Freelance
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default UserDashboard;