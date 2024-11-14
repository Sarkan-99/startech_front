"use client";
import React, { useEffect, useState } from 'react';
import { Steps } from 'primereact/steps';
import { Button } from 'primereact/button';
import { Info } from '../../components/Info';
import { PdfViewer } from '../../components/PdfViewer';
import { MyVideo } from '../../components/MyVideo';
import { Note } from '../../components/Note';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { axiosDB } from '../../api/axios';

export default function Test() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [activeIndex, setActiveIndex] = useState(0);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [project, setProject] = useState({});
    const [notes, setNotes] = useState([]);
    const [pdf, setPdf] = useState("");
    const [validerDisabled, setValiderDisabled] = useState(true);

    // Note fields
    const [qualite, setQualite] = useState(null);
    const [inovation, setInovation] = useState(null);
    const [partinence, setPartinence] = useState(null);
    const [effort, setEffort] = useState(null);
    const [env, setEnv] = useState(null);
    const [comment, setComment] = useState(null);

    useEffect(() => {
        const project_id = searchParams.get('project_id');

        const fetchData = async () => {
            try {
                const [projectResponse, notesResponse, pdfResponse] = await Promise.all([
                    axiosDB.get(`/projet/${project_id}`),
                    axiosDB.post('/notes/add', { id_projet: project_id }),
                    axiosDB.get(`/get_project_pdf/${project_id}`)
                ]);
                console.log("note from show: ",notesResponse.data.note);
                setProject(projectResponse.data.projet);
                setNotes(notesResponse.data.note);
                setPdf(pdfResponse.data.url);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        
        if (project_id) {
            fetchData();
        }

        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };
        
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };

    },[searchParams]);

    const handleValuesChange = (values) => {
        setValiderDisabled(values.includes(null));
        if (!values.includes(null)) {
            [setQualite, setInovation, setPartinence, setEffort, setEnv, setComment].forEach((setter, i) =>
                setter(values[i])
            );
        }
    };
  
    const validate = async () => {
        try {
            
            await axiosDB.put('/notes/update', {
                id: notes.id,
                comentaire: comment,
                qualite_note: qualite,
                inovation_note: inovation,
                pertinence_note: partinence,
                effort_note: effort,
                env_note: env,
                id_projet: project_id,
            });
            router.push('/home');
        } catch (error) {
            console.error('Error validating notes:', error);
        }
    };

    const renderContent = () => {
        switch (activeIndex) {
            case 0: return <Info projet={project} />;
            case 1: return <PdfViewer src={pdf} />;
            case 2: return project.url_video == '' ? <span className='flex justify-center p-32'>Video non disponible</span> : <MyVideo src = {project.url_video}/>;
            case 3: return <Note notes={notes} onValuesChange={handleValuesChange} />;
            default: return null;
        }
    };

    const items = [
        { icon: 'pi pi-user', label: 'Informations', template: item => itemRenderer(item, 0) },
        { icon: 'pi pi-clipboard', label: 'Rapport', template: item => itemRenderer(item, 1) },
        { icon: 'pi pi-clipboard', label: 'Video', template: item => itemRenderer(item, 2) },
        { icon: 'pi pi-check', label: 'Evaluer', template: item => itemRenderer(item, 3) }
    ];

    console.log('notttttttttttttttttttt : ', notes);
    const itemRenderer = (item, itemIndex) => {
        const isActive = activeIndex === itemIndex;
        return (
            <div
                className="c-step-container"
                onClick={() => setActiveIndex(itemIndex)}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: isSmallScreen ? '-25px' : '-4px',  // Conditional marginTop
                }}
            >
                <span
                    className="c-step"
                    style={{
                        backgroundColor: isActive ? 'var(--primary-color)' : 'var(--surface-b)',
                        color: isActive ? 'var(--surface-b)' : 'var(--text-color-secondary)',
                        borderRadius: '50%',
                        padding: '10px'
                    }}
                >
                    <i className={`${item.icon} text-xl`} />
                </span>
                {!isSmallScreen && (
                    <span className="step-label" style={{ marginTop: '5px', color: isActive ? 'var(--primary-color)' : 'var(--text-color-secondary)', fontSize: 'large' }}>
                        {item.label}
                    </span>
                )}
            </div>
        );
    };

    return (
        <div className="card max-h-full h-[50rem] relative">
            <Steps model={items} activeIndex={activeIndex} readOnly={false} className="m-2 pt-4" />
            {renderContent()}
            <div className="flex gap-3 absolute bottom-4 right-4">
                <Button label="valider" icon="pi pi-check" iconPos="right" onClick={validate} disabled={validerDisabled} />
                <Link href='/home'>
                    <Button label="fermer" severity="secondary" icon="pi pi-times" iconPos="right" />
                </Link>
            </div>
        </div>
    );
}
