'use client'

import { useRouter } from 'next/navigation'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import React from 'react'

const page = () => {
    const router = useRouter();
    const back = () => {
        router.push('/');
    }
  return (
    <div>
        <Card>
            <div>
                authentification failed, back to welcome page
                <Button label='continue' onClick={back}/>
            </div>
        </Card>
    </div>
  )
}

export default page