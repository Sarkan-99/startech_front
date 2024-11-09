"use client";

import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { axiosDB } from './api/axios';

export default function StartButton() {
  const router = useRouter();

  const handleStart = async () => {
    try {
      console.log("hello before start");
      
      const response = await axiosDB.post('/auth/google/'); 

      const googleAccessToken = response.data.access_token;
      console.log("tokkens : ",googleAccessToken);
      
      localStorage.setItem('google_access_token', googleAccessToken);

      router.push('/home');
    } catch (error) {
      console.error('Google authentication failed:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Button label="Start" onClick={handleStart} />
    </div>
  );
}
