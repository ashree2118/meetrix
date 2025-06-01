import React from 'react'
import { Button } from "@/components/ui/button"

function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-center py-4">
        Meetrix
      </h1>
      <p className="text-base sm:text-lg md:text-xl mb-8 text-center max-w-xl">
        Welcome to the Meetrix platform, where collaboration meets innovation.
      </p>
      <Button className="">
        Create Profile
      </Button>
    </div>
  )
}

export default Landing;
