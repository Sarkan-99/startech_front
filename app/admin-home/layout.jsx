"use client"

import { Card } from 'primereact/card';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { axiosDB } from '../api/axios';
import { useRouter } from 'next/navigation';
import { Image } from 'primereact/image';
import { Divider } from 'primereact/divider';


const Mainpage = ({children}) => {

  const op = useRef(null);
  const router = useRouter();
  const [user, setUser]  = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try{
        const response = await axiosDB.get('/user');
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user : ', error)
      }
    }

    fetchUser();
  },[setUser])

  
  async function logOut() {
    try {
        const response = await axiosDB.post('/logout');
        console.log("response:", response);
        localStorage.clear();
        router.push('/');
    } catch (error) {
        console.error("Logout error:", error);
    }
}

  return (
    <div className='relative bg-zinc-50 h-screen p-0 m-0'>
      <div className='absolute flex flex-row w-full bg-blue-500 p-2'>
      <Image src="../Logo.png" alt="Logo Image" width="110" className='m-2 ml-5' />
        <div className="absolute flex justify-center p-1 right-3" >
            <Button className='my-custom-button' icon="pi pi-user" rounded  aria-label="User" onClick={(e) => op.current.toggle(e)} />
            <OverlayPanel ref={op}>
                <div className="flex flex-col">
                    <span>{user.nom_complet}</span>
                    <Divider/>
                    <Button icon="pi pi-sign-out" text severity="secondary" onClick={logOut} label="Log out" className="h-5"  />
                </div>
            </OverlayPanel>
        </div>
      </div>
      <div className='static bg-blue-500 h-1/3 w-full flex justify-center'>
      <div className="absolute h-3/4 w-4/5 mt-36 flex justify-center items-center bg-white rounded">
        <Card className='h-full w-full'>
        <Suspense fallback={<div>Loading...</div>}>
          { children }
        </Suspense>
        </Card>
      </div>
      </div>
    </div>
  )
}

export default Mainpage
