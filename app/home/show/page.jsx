"use client";
import React, { useEffect, useState } from 'react'; 
import { Steps } from 'primereact/steps';

import { Button } from 'primereact/button';
import { Info } from '@/app/components/Info';
import { PdfViewer } from '@/app/components/PdfViewer';
import { Note } from '@/app/components/Note';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
        




export default function Test() {
    const searchParams = useSearchParams();
    
    const [activeIndex, setActiveIndex] = useState(0);
    const [validerDisabled, setValiderDisabled] = useState(true);
 
    const projectString = searchParams.get('project');
    let project = null;
    
    try {
        project = projectString ? JSON.parse(projectString) : null;
    } catch (error) {
        console.error("Failed to parse project:", error);
    }
    const handleValuesChange = (values) => {
        setValiderDisabled(values.some(value => value === null));
    };

    const itemRenderer = (item, itemIndex) => {
        const isActiveItem = activeIndex === itemIndex;
        const backgroundColor = isActiveItem ? 'var(--primary-color)' : 'var(--surface-b)';
        const textColor = isActiveItem ? 'var(--surface-b)' : 'var(--text-color-secondary)';
        const labelColor = isActiveItem ? 'var(--primary-color)' : 'var(--text-color-secondary)';

        return (
            <div
            className="c-step-container"
            onClick={() => setActiveIndex(itemIndex)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-4px' }}
        >
            <span
                className="c-step"
                style={{
                    backgroundColor: backgroundColor,
                    color: textColor,
                    borderRadius: '50%',
                    padding: '10px'
                }}
            >
                <i className={`${item.icon} text-xl`} />
            </span>
            <span className="step-label" style={{ marginTop: '5px', color: labelColor , fontSize: 'large' }}>
                {item.label}
            </span>
        </div>
            
        );
    };

    const items = [
        {
            icon: 'pi pi-user',
            label: 'Informations',
            template: (item) => itemRenderer(item, 0)
        },
        {
            icon: 'pi pi-clipboard',
            label: 'Rapport',
            template: (item) => itemRenderer(item, 1)
        },
        {
            icon: 'pi pi-check',
            label: 'Evaluation',
            template: (item) => itemRenderer(item, 2)
        }
    ];

    // function validate = async () =>{

    // }
    
    return (
        <div className="card max-h-screen h-[60rem] relative">
        <Steps model={items} activeIndex={activeIndex} readOnly={false} className="m-2 pt-4" />
        {
            activeIndex === 0 ? <Info projet={project}/> : activeIndex === 1 ? <PdfViewer src={project.url_pdf}/> : <Note  projet={project} onValuesChange={handleValuesChange} />
        }
        <div className="flex gap-3 absolute bottom-4 right-4">
            <Button label="valider" icon="pi pi-check" iconPos="right" disabled={validerDisabled} />
            <Link href='/home'>
                <Button label="fermer" severity="secondary" icon="pi pi-times" iconPos="right" />
            </Link>
        </div>
    </div>
    
    )
}