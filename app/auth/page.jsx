'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
    <div>Loading...</div>
  );
};

export default Page;
