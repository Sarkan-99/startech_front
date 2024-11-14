'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Policy from '../components/Policy';

const Page = () => {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const redirectByMe = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
  
      if (token && accepted) {
        localStorage.setItem('google_access_token', token);
        console.log("token storred");
        router.push('/home');
      } else if(token && !accepted){
        localStorage.setItem('google_access_token', token);
        router.push("#")
      } else {
        router.push('/');
      }
    };

    redirectByMe();
  }, [router, accepted]);

  return (
    <div>
      <Policy hello={accepted} event={setAccepted}/>
    </div>
  );
};

export default Page;
