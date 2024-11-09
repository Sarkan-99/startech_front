import React from 'react'
import { Button } from 'primereact/button';
import Link from 'next/link';

const page = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <Link href='http://127.0.0.1:8000/auth/google'>
        <Button label='Start'/>
      </Link>
    </div>
  )
}

export default page