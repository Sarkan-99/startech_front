'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProgressSpinner } from 'primereact/progressspinner';


const Page = () => {
  const router = useRouter();

  const redirectByMe = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      
      localStorage.setItem('google_access_token', token);
      console.log("token storred");
      router.push('/home');
    } else {
      router.push('/');
    }
  };

  useEffect(() => {
    redirectByMe();
  }, []);

  return (
    <div className='flex justify-center items-center h-screen'>
      <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="4" fill="var(--surface-ground)" animationDuration=".5s" />
    </div>
  );
};

export default Page;
