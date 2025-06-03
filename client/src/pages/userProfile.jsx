import React from 'react'
import { Button } from "@/components/ui/button"

function userProfile() {
  return (
    <div>
      <h1 className='text-3xl md:text-4xl lg:text-6xl font-bold text-center py-4'>User Profile</h1>
      <p className='text-base sm:text-lg md:text-xl mb-8 text-center max-w-xl'>Manage your profile settings and preferences.</p>
      <Button className="mt-4">Edit Profile</Button>
    </div>
  )
}

export default userProfile
