import React from 'react'
import { Button } from 'primereact/button';
import Link from 'next/link';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Image } from 'primereact/image';


const page = () => {
  return (
    <div className='flex flex-row h-screen w-screen overflow-hidden'>
      {/* photo */}

      <div className="bg-blue-300 h-screen relative" >
        <Image alt="logo" src="/login-page.png" height={610} />
        <div className="absolute top-0 left-0 w-full h-full flex items-start justify-center bg-blue-300 bg-opacity-30">
          <div className="text-white font-bold mt-16 "><h1>StarTech pour notéé votre <br/> candidats projects</h1>
              <h4>in the easiest way</h4>
          </div>
        </div>
      </div>
      
    {/* login place */}

      <div className="relative flex justify-center items-center h-screen w-full bg-gray-50">
        <Image src='/LogoBlack.png' className='absolute top-10 right-10' height='45'></Image>
        <div className='absolute flex flex-col h-2/4 top-24 justify-around'>
          <div>
              <h1 className=" font-bold">Connecté vous au StarTech</h1>
              <Divider/>
          </div>
        <Card className='w-auto h-auto p-4'>
            <div className='flex flex-row justify-center items-center h-auto'>
            <span className="m-4">Login</span>
            <Divider layout="vertical"/>
            <div className="text-center grid">
                <form>
                    <div>
                    <Link href="http://127.0.0.1:8000/auth/google" passHref>
                        <Button outlined severity="secondary">
                            <div className="flex justify-center items-center">
                            <img alt="logo" src="/Google-logo.png" className="mr-3" height={25}></img>
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
    </div>
</div>
  )
}

export default page