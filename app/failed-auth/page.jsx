'use client' 
import { Button } from 'primereact/button'
import { Image } from 'primereact/image'
import { Card } from 'primereact/card'
import React from 'react'
import Link from 'next/link'

const page = () => {
  
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-5 py-10">
          {/* Card Container */}
          <Card className="w-full h-full">
            <div className="w-full h-full flex flex-row justify-center">
            <div  className="w-4/5 h-full flex flex-col items-center mt-10">
                <div className="w-fit h-1/2 flex flex-col justify-center ml-5">
                    {/* Title */}
                    <h1 className="text-5xl font-bold text-black mb-4">Account not found</h1>
    
                    {/* Message */}
                    <h4 className="text-gray-600 mb-8">
                      You should use a <span className="font-semibold">Google email account</span>.
                    </h4>
                </div>
                {/* Go Back Button */}
                <Link href={'/'} style={{ textDecoration: 'none'}}>
                    <Button
                      label="GO BACK"
                      className="p-button-primary w-fit flex justify-center "
                    />
                </Link>
            </div>
            {/* Illustration Placeholder */}
            <div  className="w-fit h-fit responsive-image">
                <Image className="flex justify-end pr-5 " alt="error image" src="/error.png" width="80%"/>
            </div>
    
            </div>
          </Card>
        </div>
      );
}

export default page