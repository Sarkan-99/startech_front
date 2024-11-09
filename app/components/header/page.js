'use client';

import { Tooltip } from 'primereact/tooltip';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import React, { useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Divider } from 'primereact/divider';
import 'primeicons/primeicons.css';
import Link from 'next/link';

export default function Header() {

    const op = useRef(null);
    const start = <i className="pi pi-apple">LOGO</i>;

    const end = (
        <div>
            <div className="flex justify-center">
                <Button icon="pi pi-user" rounded text severity="info" aria-label="User" onClick={(e) => op.current.toggle(e)} />
                <OverlayPanel ref={op}>
                    <div className="flex flex-col">
                        <span>User Name:</span>
                        <span>User Email:</span>
                        <Divider />
                        <Link href="./auth" passHref>
                        <Button icon="pi pi-sign-out" text severity="secondary" label="Log out" className="h-5"  />
                        </Link>
                    </div>
                </OverlayPanel>
            </div>
        </div>
    );

    return (
        <div className="card dock-demo m-0 p-0">
            <Tooltip className="dark-tooltip" target=".dock-advanced .p-dock-action" my="center+15 bottom-15" at="center top" showDelay={150} />
            <Menubar start={start} end={end} className="bg-indigo-50" />
        </div>
    );
}
