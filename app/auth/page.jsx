'use client';
<<<<<<< HEAD

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { axiosDB } from '../api/axios';

const Page = () => {
  const router = useRouter();

  const redirectByMe = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      
      localStorage.setItem('google_access_token', token);
      console.log("token storred");
      router.push('/home');
    }
  };

  useEffect(() => {
    redirectByMe();
  }, []);

  return (
    <div>Loading...</div>
  );
};

export default Page;
=======
import React from 'react';

import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import Link from 'next/link';
     

const login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
            {/* <Card className='w-auto h-auto'>
                <div className='flex flex-row flex justify-center items-center h-auto'>
                <span className="m-4">Login</span>
                <Divider layout="vertical"/>
                <div className="text-center grid">
                    <form>
                        <div>
                        <Link href="./mainpage" passHref>
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
            </Card>  */}
            hello OUT OF HERE
    </div>
    );
}

export default login
>>>>>>> 7c7284f75f317ba2dc7211caaec50913b97b944f
