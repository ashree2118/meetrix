import React from 'react'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

function MeetSchedule() {
  return (
    <div>

      <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>

        <h1 className=' mx-auto text-3xl md:text-4xl lg:text-6xl align-center py-4'>Meetrix</h1>

        <p className='text-lg mb-8'>Schedule your meetings seamlessly with Meetrix.</p>
        <Calendar />

        <div className='mt-8'><Button >
          Send Link
        </Button></div>
      </div>
    </div>
  )
}

export default MeetSchedule
