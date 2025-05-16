import React from 'react'
import { Button } from "@/components/ui/button"

function Landing() {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <h1 className=' mx-auto text-3xl md:text-4xl lg:text-6xl align-center py-4'>Meetrix</h1>
      <p className='text-lg mb-8'>Welcome to the Meetrix platform, where collaboration meets innovation.</p>
      <Button >
			Send Link
	  </Button>
      
    </div>
  )
}

export default Landing;
