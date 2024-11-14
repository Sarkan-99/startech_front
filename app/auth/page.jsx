'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Policy from '../components/Policy';

const Page = () => {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const redirectByMe = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
  
      if (token) {
        localStorage.setItem('google_access_token', token);
        if (accepted) {
          console.log("Token stored and policy accepted, redirecting to /home");
          router.push('/home');
        } else {
          console.log("Token stored but policy not accepted, staying on current page");
        }
      } else {
        router.push('/');
      }
    };

    redirectByMe();
  }, [accepted, router]);

  return (
    <div>
      <Policy setValidation={setAccepted}/>
    </div>
  );
};

export default Page;
