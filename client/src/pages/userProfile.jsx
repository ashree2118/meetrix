import React from 'react'
import { Button } from "@/components/ui/button"

function userProfile() {
  return (
    <div>
      <h1 className='text-3xl md:text-4xl lg:text-6xl font-bold text-center py-4'>User Profile</h1>
      <p className='text-base sm:text-lg md:text-xl mb-8 text-center max-w-xl'>Manage your profile settings and preferences.</p>
      <Button className="mt-4">Edit Profile</Button>
      <Button className="mt-4 ml-4">Logout</Button>
      <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
        <h2 className='text-2xl font-semibold'>Profile Details</h2>
        <p className='mt-2'>Name: John Doe</p>
        <p>Email: john.doe@example.com</p>
        <p>Add meeting purpose: <input type="text" className="border border-gray-300 rounded-md p-2 mt-1" /></p>
        <p>Timezone: <input type="text" className="border border-gray-300 rounded-md p-2 mt-1" /></p>
      </div>
      </div>
  )
}

export default userProfile
