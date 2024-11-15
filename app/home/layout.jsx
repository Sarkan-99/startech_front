'use client';

import { Card } from 'primereact/card';
import React, { Suspense, useRef } from 'react';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { axiosDB } from '../api/axios';
import { useRouter } from 'next/navigation';
import { Image } from 'primereact/image';

const MainPage = ({ children }) => {
  const op = useRef(null);
  const router = useRouter();

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
    <div className="relative bg-zinc-50 min-h-screen p-0 m-0">
      <header className="flex items-center w-full bg-blue-500 p-2">
        {/* Logo */}
        <Image src="/Logo.png" alt="Logo Image" width="110" className="m-2 ml-5" />

        {/* Logout Button */}
        <div className="absolute top-4 right-5 flex items-center">
          <Button
            className="my-custom-button"
            icon="pi pi-user"
            rounded
            aria-label="User"
            onClick={(e) => op.current.toggle(e)}
          />
          <OverlayPanel ref={op}>
            <div className="flex flex-col">
              <Button
                icon="pi pi-sign-out"
                text
                severity="secondary"
                onClick={logOut}
                label="Deconnexion"
                className="h-5"
              />
            </div>
          </OverlayPanel>
        </div>
      </header>

      <main
        className="flex justify-center items-center"
        style={{
          background: 'linear-gradient(to bottom, #3b82f6 100px, #ffffff 0)',
          height: 'calc(100% - 64px)',
        }}
      >
        <div className="card-container w-11/12 bg-white rounded shadow-md p-4">
          <div className="w-full">
            <Suspense fallback={<div>Loading...</div>}>
              {children}
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
