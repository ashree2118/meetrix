// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Card, CardContent } from "@/components/ui/card";
// import { format } from "date-fns";
// import { Copy, Check } from "lucide-react";

// function UserDashboard() {
//   const { username } = useParams();
//   const navigate = useNavigate();
//   const [meetingsByDate, setMeetingsByDate] = useState({});
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [user, setUser] = useState(null);
//   const [copied, setCopied] = useState(false);

//   // Fetch current logged-in user
//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/current-user`, {
//       method: "GET",
//       credentials: "include",
//     })
//       .then(res => res.json().then(data => ({ ok: res.ok, data })))
//       .then(({ ok, data }) => {
//         if (!ok) throw new Error(data.message || "Auth failed");
//         setUser({
//           ...data.data,
//           profileLink: `${window.location.origin}/schedule/${data.data.username}`,
//         });
//       })
//       .catch(() => navigate("/login"));
//   }, [navigate]);

//   // Once user loaded, verify route and fetch meetings
//   useEffect(() => {
//     if (user) {
      
//       fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/meetings/grouped`, {
//         method: "GET",
//         credentials: "include",
//       })
//         .then(res => res.json().then(data => ({ ok: res.ok, data })))
//         .then(({ ok, data }) => {
//           if (!ok) throw new Error(data.message);
//           const grouped = {};
//           data.data.forEach(group => { grouped[group._id] = group.meetings; });
//           setMeetingsByDate(grouped);
//         })
//         .catch(err => console.error("Failed to fetch meetings:", err));
//     }
//   }, [user, username, navigate]);

//   const handleCopy = () => {
//     if (!user?.profileLink) return;
//     navigator.clipboard.writeText(user.profileLink);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const selectedKey = format(selectedDate, "yyyy-MM-dd");
//   const meetingsToday = meetingsByDate[selectedKey] || [];

//   const getColor = purpose => ({
//     work: "bg-blue-500",
//     personal: "bg-green-500",
//     friends: "bg-pink-500",
//     freelance: "bg-yellow-500"
//   }[purpose] || "bg-gray-400");

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 py-10">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-4xl font-bold text-center mb-6">
//           {user?.name}'s Dashboard
//         </h1>

//         {user && (
//           <div className="text-center mb-8">
//             <p className="font-medium">Share your Scheduling Link:</p>
//             <div className="mt-2 flex justify-center items-center gap-2 bg-white border rounded p-2 shadow">
//               <span className="truncate text-blue-600 max-w-[250px]">
//                 {user.profileLink}
//               </span>
//               <Button variant="ghost" size="icon" onClick={handleCopy}>
//                 {copied ? (
//                   <Check className="w-4 h-4 text-green-600" />
//                 ) : (
//                   <Copy className="w-4 h-4" />
//                 )}
//               </Button>
//             </div>
//             {copied && <p className="text-green-600 mt-1">Link copied!</p>}
//           </div>
//         )}

//         <div className="bg-white p-6 rounded-xl shadow mb-8">
//           <Calendar
//             selected={selectedDate}
//             onSelect={setSelectedDate}
//             modifiers={{
//               work: Object.entries(meetingsByDate)
//                 .filter(([date, ms]) => ms.some(m => m.meetingPurpose === "work"))
//                 .map(([d]) => new Date(d)),
//               personal: Object.entries(meetingsByDate)
//                 .filter(([_, ms]) => ms.some(m => m.meetingPurpose === "personal"))
//                 .map(([d]) => new Date(d)),
//               friends: Object.entries(meetingsByDate)
//                 .filter(([_, ms]) => ms.some(m => m.meetingPurpose === "friends"))
//                 .map(([d]) => new Date(d)),
//               freelance: Object.entries(meetingsByDate)
//                 .filter(([_, ms]) => ms.some(m => m.meetingPurpose === "freelance"))
//                 .map(([d]) => new Date(d)),
//               other: Object.entries(meetingsByDate)
//                 .filter(([_, ms]) =>
//                   ms.every(m =>
//                     !["work","personal","friends","freelance"].includes(m.meetingPurpose)
//                   )
//                 ).map(([d]) => new Date(d)),
//             }}
//             modifiersClassNames={{
//               work: "bg-blue-100 text-blue-800 font-semibold",
//               personal: "bg-green-100 text-green-800 font-semibold",
//               friends: "bg-pink-100 text-pink-800 font-semibold",
//               freelance: "bg-yellow-100 text-yellow-800 font-semibold",
//               other: "bg-gray-200 text-gray-800 font-semibold",
//             }}
//           />
//         </div>

//         <h2 className="text-2xl font-semibold mb-4">
//           Meetings on {selectedKey}
//         </h2>
//         {meetingsToday.length ? (
//           meetingsToday.map(meeting => (
//             <Card key={meeting._id} className="mb-4 shadow-sm">
//               <CardContent className="flex justify-between items-center p-4">
//                 <div>
//                   <p className="text-lg capitalize">{meeting.meetingPurpose}</p>
//                   <p className="text-sm text-gray-500">
//                     {new Date(meeting.utcTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                   </p>
//                 </div>
//                 <div className={`w-3 h-3 rounded-full ${getColor(meeting.meetingPurpose)}`} />
//               </CardContent>
//             </Card>
//           ))
//         ) : (
//           <p className="text-gray-500">No meetings on this day.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UserDashboard;


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

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 px-4 py-6 sm:py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 text-gray-900"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {user?.name}'s Dashboard
        </motion.h1>

        {user && (
          <motion.div 
            className="text-center mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="font-medium text-gray-700">Share your Scheduling Link:</p>
            <motion.div 
              className="mt-2 flex flex-col sm:flex-row justify-center items-center gap-2 bg-white border border-gray-300 rounded p-2 shadow-sm mx-auto max-w-md sm:max-w-lg"
              whileHover={{ scale: 1.02 }}
            >
              <span className="truncate text-gray-800 max-w-[250px] sm:max-w-none break-all text-sm">
                {user.profileLink}
              </span>
              <Button variant="ghost" size="icon" onClick={handleCopy} className="hover:bg-gray-100">
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check className="w-4 h-4 text-gray-700" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
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
                  className="text-gray-700 mt-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  Link copied!
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        <motion.div 
          className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        >
          <Calendar
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="w-full"
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
              work: "bg-pink-200 text-pink-800 font-semibold",
              personal: "bg-green-200 text-green-800 font-semibold",
              friends: "bg-yellow-200 text-yellow-800 font-semibold",
              freelance: "bg-purple-200 text-purple-800 font-semibold",
              other: "bg-gray-200 text-gray-800 font-semibold",
            }}
          />
        </motion.div>

        <motion.h2 
          className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Meetings on {selectedKey}
        </motion.h2>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {meetingsToday.length ? (
            meetingsToday.map((meeting, index) => (
              <motion.div
                key={meeting._id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="mb-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="flex justify-between items-center p-4">
                    <div>
                      <p className="text-base sm:text-lg capitalize text-gray-900">{meeting.meetingPurpose}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(meeting.utcTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    <motion.div 
                      className={`w-3 h-3 rounded-full ${getColor(meeting.meetingPurpose)}`}
                      whileHover={{ scale: 1.2 }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">No meetings on this day.</p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default UserDashboard;