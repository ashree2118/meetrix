// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Card, CardContent } from "@/components/ui/card";
// import { format } from "date-fns";
// import { Copy, Check } from "lucide-react";

// function UserDashboard() {
//   const { username } = useParams();
//   const [meetingsByDate, setMeetingsByDate] = useState({});
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [user, setUser] = useState(null);
//   const [copied, setCopied] = useState(false);

//   const fetchMeetings = async () => {
//   try {
//     const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/meetings/grouped`, {
//       method: "GET",
//       credentials: "include",
//     });
//     const data = await res.json();
//     if (res.ok) {
//       const grouped = {};
//       data.data.forEach(group => {
//         grouped[group._id] = group.meetings;
//       });
//       setMeetingsByDate(grouped);
//     } else {
//       console.error("Failed to fetch meetings:", data.message);
//     }
//   } catch (err) {
//     console.error("Fetch meetings error:", err);
//   }
// };

// useEffect(() => {
//   if (user && username && user.username !== username) {
//     // Optional: redirect or show error
//     alert("Unauthorized access to dashboard");
//     window.location.href = "/";
//   }
// }, [user, username]);

//   const fetchUser = async () => {
//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/current-user`,
//         {
//           method: "GET",
//           credentials: "include",
//         }
//       );
//       const data = await res.json();
//       if (res.ok) {
//         const currentUser = {
//           ...data.data,
//           profileLink: `${window.location.origin}/schedule/${data.data.username}`,
//         };
//         setUser(currentUser);
//         fetchMeetings(currentUser.username); // ✅ fetch meetings after user is known
//       }
//     } catch (error) {
//       console.error("Failed to fetch user info");
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const handleCopy = async () => {
//     if (user?.profileLink) {
//       await navigator.clipboard.writeText(user.profileLink);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   const formattedDate = format(
//     new Date(
//       Date.UTC(
//         selectedDate.getFullYear(),
//         selectedDate.getMonth(),
//         selectedDate.getDate()
//       )
//     ),
//     "yyyy-MM-dd"
//   );

//   const selectedDateMeetings = meetingsByDate[format(selectedDate, "yyyy-MM-dd")] || [];

//   const getColor = (purpose) => {
//     switch (purpose) {
//       case "work":
//         return "bg-blue-500";
//       case "personal":
//         return "bg-green-500";
//       case "friends":
//         return "bg-pink-500";
//       case "freelance":
//         return "bg-yellow-500";
//       default:
//         return "bg-gray-400";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 py-10">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-4xl font-bold text-center mb-6">
//           {user?.name}'s Dashboard
//         </h1>

//         {/* Profile Link Copy Box */}
//         {user && (
//           <div className="text-center mb-8">
//             <p className="text-lg font-medium">Share your Scheduling Link:</p>
//             <div className="mt-2 flex justify-center items-center gap-2 bg-white border rounded-md p-2 px-4 shadow-sm">
//               <span className="truncate text-sm text-blue-600 max-w-[250px]">
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
//             {copied && (
//               <p className="text-xs text-green-600 mt-1">Link copied!</p>
//             )}
//           </div>
//         )}

//         {/* Calendar */}
//         <div className="bg-white p-6 rounded-xl shadow mb-8">
//           <Calendar
//             selected={selectedDate}
//             onSelect={setSelectedDate}
//             modifiers={{
//               work: Object.keys(meetingsByDate)
//                 .filter((d) =>
//                   meetingsByDate[d].some((m) => m.meetingPurpose === "work")
//                 )
//                 .map((d) => new Date(d)),
//               personal: Object.keys(meetingsByDate)
//                 .filter((d) =>
//                   meetingsByDate[d].some((m) => m.meetingPurpose === "personal")
//                 )
//                 .map((d) => new Date(d)),
//               friends: Object.keys(meetingsByDate)
//                 .filter((d) =>
//                   meetingsByDate[d].some((m) => m.meetingPurpose === "friends")
//                 )
//                 .map((d) => new Date(d)),
//               freelance: Object.keys(meetingsByDate)
//                 .filter((d) =>
//                   meetingsByDate[d].some((m) => m.meetingPurpose === "freelance")
//                 )
//                 .map((d) => new Date(d)),
//               other: Object.keys(meetingsByDate)
//                 .filter((d) =>
//                   meetingsByDate[d].every(
//                     (m) =>
//                       ![
//                         "work",
//                         "personal",
//                         "friends",
//                         "freelance",
//                       ].includes(m.meetingPurpose)
//                   )
//                 )
//                 .map((d) => new Date(d)),
//             }}
//             modifiersClassNames={{
//               work: "bg-blue-100 text-blue-800 font-semibold",
//               personal: "bg-green-100 text-green-800 font-semibold",
//               friends: "bg-pink-100 text-pink-800 font-semibold",
//               freelance: "bg-yellow-100 text-yellow-800 font-semibold",
//               other: "bg-gray-200 text-gray-800 font-semibold",
//             }}
//           />
//           {/* Legend */}
//           <div className="flex justify-center gap-4 text-sm text-gray-600 mt-4">
//             <div className="flex items-center gap-1">
//               <span className="w-3 h-3 rounded-full bg-blue-500"></span> Work
//             </div>
//             <div className="flex items-center gap-1">
//               <span className="w-3 h-3 rounded-full bg-green-500"></span> Personal
//             </div>
//             <div className="flex items-center gap-1">
//               <span className="w-3 h-3 rounded-full bg-pink-500"></span> Friends
//             </div>
//             <div className="flex items-center gap-1">
//               <span className="w-3 h-3 rounded-full bg-yellow-500"></span> Freelance
//             </div>
//             <div className="flex items-center gap-1">
//               <span className="w-3 h-3 rounded-full bg-gray-400"></span> Other
//             </div>
//           </div>
//         </div>

//         {/* Meeting Cards */}
//         <h2 className="text-2xl font-semibold mb-4">
//           Meetings on {formattedDate}
//         </h2>
//         {selectedDateMeetings.length > 0 ? (
//   selectedDateMeetings.map((m) => (
//             <Card key={m._id} className="mb-4 shadow-sm">
//               <CardContent className="p-4 flex justify-between items-center">
//                 <div>
//                   <p className="text-lg font-medium capitalize">
//                     {m.meetingPurpose}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     {new Date(m.utcTime).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </p>
//                   {m.note && (
//                     <p className="italic text-sm text-gray-600 mt-1">
//                       {m.note}
//                     </p>
//                   )}
//                 </div>
//                 <div
//                   className={`w-3 h-3 rounded-full ${getColor(m.meetingPurpose)}`}
//                 />
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

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Card, CardContent } from "@/components/ui/card";
// import { format } from "date-fns";
// import { Copy, Check } from "lucide-react";

// function UserDashboard() {
//   const { username } = useParams();
//   const [meetingsByDate, setMeetingsByDate] = useState({});
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [user, setUser] = useState(null);
//   const [copied, setCopied] = useState(false);

//   const fetchMeetings = async () => {
//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_API_BASE_URL}/api/v1/meetings/grouped`,
//         {
//           method: "GET",
//           credentials: "include",
//         }
//       );
//       const data = await res.json();
//       if (res.ok) {
//         const grouped = {};
//         data.data.forEach((group) => {
//           grouped[group._id] = group.meetings;
//         });
//         setMeetingsByDate(grouped);
//       } else {
//         console.error("Failed to fetch meetings:", data.message);
//       }
//     } catch (err) {
//       console.error("Fetch meetings error:", err);
//     }
   
    
//   };

//   useEffect(() => {
//     if (user && username && user.username !== username) {
//       alert("Unauthorized access to dashboard");
//       window.location.href = "/";
//     }
//   }, [user, username]);

//   const fetchUser = async () => {
//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/current-user`,
//         {
//           method: "GET",
//           credentials: "include",
//         }
//       );
//       const data = await res.json();
//       if (res.ok) {
//         const currentUser = {
//           ...data.data,
//           profileLink: `${window.location.origin}/schedule/${data.data.username}`,
//         };
//         setUser(currentUser);
//         fetchMeetings(currentUser.username);
//       }
//     } catch (error) {
//       console.error("Failed to fetch user info");
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const handleCopy = async () => {
//     if (user?.profileLink) {
//       await navigator.clipboard.writeText(user.profileLink);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   const formattedDate = format(selectedDate, "yyyy-MM-dd");
//   const selectedDateMeetings = meetingsByDate[formattedDate] || [];

//   const getColor = (purpose) => {
//     switch (purpose) {
//       case "work":
//         return "bg-blue-500";
//       case "personal":
//         return "bg-green-500";
//       case "friends":
//         return "bg-pink-500";
//       case "freelance":
//         return "bg-yellow-500";
//       default:
//         return "bg-gray-400";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 py-10">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-4xl font-bold text-center mb-6">
//           {user?.name}'s Dashboard
//         </h1>

//         {user && (
//           <div className="text-center mb-8">
//             <p className="text-lg font-medium">Share your Scheduling Link:</p>
//             <div className="mt-2 flex justify-center items-center gap-2 bg-white border rounded-md p-2 px-4 shadow-sm">
//               <span className="truncate text-sm text-blue-600 max-w-[250px]">
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
//             {copied && (
//               <p className="text-xs text-green-600 mt-1">Link copied!</p>
//             )}
//           </div>
//         )}

//         {/* Calendar */}
//         <div className="bg-white p-6 rounded-xl shadow mb-8">
//           <Calendar
//             selected={selectedDate}
//             onSelect={setSelectedDate}
//             modifiers={{
//               work: Object.keys(meetingsByDate)
//                 .filter((d) =>
//                   meetingsByDate[d].some((m) => m.meetingPurpose === "work")
//                 )
//                 .map((d) => new Date(d)),
//               personal: Object.keys(meetingsByDate)
//                 .filter((d) =>
//                   meetingsByDate[d].some((m) => m.meetingPurpose === "personal")
//                 )
//                 .map((d) => new Date(d)),
//               friends: Object.keys(meetingsByDate)
//                 .filter((d) =>
//                   meetingsByDate[d].some((m) => m.meetingPurpose === "friends")
//                 )
//                 .map((d) => new Date(d)),
//               freelance: Object.keys(meetingsByDate)
//                 .filter((d) =>
//                   meetingsByDate[d].some(
//                     (m) => m.meetingPurpose === "freelance"
//                   )
//                 )
//                 .map((d) => new Date(d)),
//               other: Object.keys(meetingsByDate)
//                 .filter((d) =>
//                   meetingsByDate[d].every(
//                     (m) =>
//                       ![
//                         "work",
//                         "personal",
//                         "friends",
//                         "freelance",
//                       ].includes(m.meetingPurpose)
//                   )
//                 )
//                 .map((d) => new Date(d)),
//             }}
//             modifiersClassNames={{
//               work: "bg-blue-100 text-blue-800 font-semibold",
//               personal: "bg-green-100 text-green-800 font-semibold",
//               friends: "bg-pink-100 text-pink-800 font-semibold",
//               freelance: "bg-yellow-100 text-yellow-800 font-semibold",
//               other: "bg-gray-200 text-gray-800 font-semibold",
//             }}
//           />

//           {/* Legend */}
//           <div className="flex justify-center gap-4 text-sm text-gray-600 mt-4">
//             <div className="flex items-center gap-1">
//               <span className="w-3 h-3 rounded-full bg-blue-500"></span> Work
//             </div>
//             <div className="flex items-center gap-1">
//               <span className="w-3 h-3 rounded-full bg-green-500"></span> Personal
//             </div>
//             <div className="flex items-center gap-1">
//               <span className="w-3 h-3 rounded-full bg-pink-500"></span> Friends
//             </div>
//             <div className="flex items-center gap-1">
//               <span className="w-3 h-3 rounded-full bg-yellow-500"></span> Freelance
//             </div>
//             <div className="flex items-center gap-1">
//               <span className="w-3 h-3 rounded-full bg-gray-400"></span> Other
//             </div>
//           </div>
//         </div>

//         {/* Meeting Cards */}
//         <h2 className="text-2xl font-semibold mb-4">
//           Meetings on {formattedDate}
//         </h2>
//         {selectedDateMeetings.length > 0 ? (
//           selectedDateMeetings.map((m) => (
//             <Card key={m._id} className="mb-4 shadow-sm">
//               <CardContent className="p-4 flex justify-between items-center">
//                 <div>
//                   <p className="text-lg font-medium capitalize">
//                     {m.meetingPurpose}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     {new Date(m.utcTime).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </p>
//                   {m.note && (
//                     <p className="italic text-sm text-gray-600 mt-1">
//                       {m.note}
//                     </p>
//                   )}
//                 </div>
//                 <div
//                   className={`w-3 h-3 rounded-full ${getColor(m.meetingPurpose)}`}
//                 />
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
    work: "bg-blue-500",
    personal: "bg-green-500",
    friends: "bg-pink-500",
    freelance: "bg-yellow-500"
  }[purpose] || "bg-gray-400");

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">
          {user?.name}'s Dashboard
        </h1>

        {user && (
          <div className="text-center mb-8">
            <p className="font-medium">Share your Scheduling Link:</p>
            <div className="mt-2 flex justify-center items-center gap-2 bg-white border rounded p-2 shadow">
              <span className="truncate text-blue-600 max-w-[250px]">
                {user.profileLink}
              </span>
              <Button variant="ghost" size="icon" onClick={handleCopy}>
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            {copied && <p className="text-green-600 mt-1">Link copied!</p>}
          </div>
        )}

        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <Calendar
            selected={selectedDate}
            onSelect={setSelectedDate}
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
              work: "bg-blue-100 text-blue-800 font-semibold",
              personal: "bg-green-100 text-green-800 font-semibold",
              friends: "bg-pink-100 text-pink-800 font-semibold",
              freelance: "bg-yellow-100 text-yellow-800 font-semibold",
              other: "bg-gray-200 text-gray-800 font-semibold",
            }}
          />
        </div>

        <h2 className="text-2xl font-semibold mb-4">
          Meetings on {selectedKey}
        </h2>
        {meetingsToday.length ? (
          meetingsToday.map(meeting => (
            <Card key={meeting._id} className="mb-4 shadow-sm">
              <CardContent className="flex justify-between items-center p-4">
                <div>
                  <p className="text-lg capitalize">{meeting.meetingPurpose}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(meeting.utcTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <div className={`w-3 h-3 rounded-full ${getColor(meeting.meetingPurpose)}`} />
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No meetings on this day.</p>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
