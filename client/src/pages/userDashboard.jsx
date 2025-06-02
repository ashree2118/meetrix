import React from 'react'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

function userDashboard() {
  return (
    <div>
     <div>
     
           <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
     
             <h1 className=' text-3xl md:text-4xl lg:text-6xl font-bold text-center py-4'>Meetrix</h1>
     
             <p className='ttext-base sm:text-lg md:text-xl mb-8 text-center max-w-xl'>Schedule your meetings seamlessly with Meetrix.</p>
             <Calendar />
     
             <div className='mt-8'><Button >
               Send Link
             </Button></div>
           </div>
         </div> 
    </div>
  )
}

export default userDashboard
