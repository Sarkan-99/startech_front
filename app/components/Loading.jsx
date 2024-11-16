'use client';

import { ProgressSpinner } from 'primereact/progressspinner';
import { useLoading } from '../contexts/LoadingContext';

const Loading = () => {
    const { loading } = useLoading();

    if (!loading) return null;
    console.log('hello from loading');

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                zIndex: 9999,
            }}
        >
            <ProgressSpinner style={{width: '50px', height: '50px', color: 'red'}} strokeWidth="4.5" fill="var(--surface-ground)" animationDuration=".8" />
        </div>
    );
};

export default Loading;