'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Policy from '../components/Policy';
import { axiosDB } from '../api/axios';

const Page = () => {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const redirectByMe = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
  
      if (token) {
        localStorage.setItem('google_access_token', token);        
        if (accepted) {
          try{
            const response = await axiosDB.get('/user');
            console.log("Token stored and policy accepted, redirecting to /home");
            console.log('role : ', response.data.user.role)
            if(response.data.user.role === 'admin'){
              router.push('/admin-home');
            } else {
              router.push('/home')
            }
          } catch (error) {
            console.error('Error fetching user:', error)
            router.push('/')
          }
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
