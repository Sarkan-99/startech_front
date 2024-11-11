import React from 'react'
import { Button } from 'primereact/button';
import Link from 'next/link';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

const page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
     <Card className='w-auto h-auto'>
         <div className='flex flex-row justify-center items-center h-auto'>
         <span className="m-4">Login</span>
         <Divider layout="vertical"/>
         <div className="text-center grid">
             <form>
                 <div>
                 <Link href="http://127.0.0.1:8000/auth/google" passHref>
                     <Button outlined severity="secondary">
                         <div className="flex justify-center items-center">
                         <img alt="logo" src="https://img.icons8.com/ios-filled/50/google-logo.png" className="mr-3" height={25}></img>
                         <span className="font-medium">Se connecter avec Google</span>
                     </div>
                     </Button>
                   </Link>
                 </div>
             </form>
         </div>
         </div>
    </Card> 
</div>
  )
}

export default page