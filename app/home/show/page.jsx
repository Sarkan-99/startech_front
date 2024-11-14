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
    const [project, setProject] = useState({});
    const [validerDisabled, setValiderDisabled] = useState(true);
    
    const [qualite, setQualite] = useState(null);
    const [inovation, setInovation] = useState(null);
    const [partinence, setPartinence] = useState(null);
    const [effort, setEffort] = useState(null);
    const [env, setEnv] = useState(null);
    const [comment, setcomment] = useState(null);
 
    
    const [pdf, setPdf] = useState("");
    
    const [notes, setNotes] = useState([]); // Assuming project_id comes from somewhere, like a search param

    useEffect(() => {
        const project_id = searchParams.get('project_id');
        const fetchProject = async () => {
            try {
                const response = await axiosDB.get(`/projet/${project_id}`);
                setProject(response.data.projet);
            } catch (error) {
                console.error('Error fetching project:', error.response ? error.response.data : error.message);
            }
        };

        const fetchNotes = async () => {
            try {
                const response = await axiosDB.post('/notes/add', {
                    id_projet: project_id
                });
                setNotes(response.data.note);
            } catch (error) {
                console.error('Error fetching notes:', error.response ? error.response.data : error.message);
            }
        };

        const fetchPdf = async () => {
            try {
                const response3 = await axiosDB.get(`/get_project_pdf/${project_id}`);
                console.log('url from Show page : ', response3.data.url);
                setPdf(response3.data.url);
            } catch (error) {
                console.error('Error fetching PDF : ', error);
            }
        }
        if (project_id) {
            fetchProject();
            fetchNotes();
            fetchPdf();
        }
    }, [searchParams]);

    const handleValuesChange = (values) => {
        setValiderDisabled(values.some(value => value === null));
        if(!values.some(value => value === null)){
            setQualite(values[0]);
            setInovation(values[1]);
            setPartinence(values[2]);
            setEffort(values[3]);
            setEnv(values[4]);
            setcomment(values[5]);
        }
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
                    className="c-step "
                    style={{
                        backgroundColor: backgroundColor,
                        color: textColor,
                        borderRadius: '50%',
                        padding: '10px'
                    }}
                >
                    <i className={`${item.icon} text-xl`} />
                </span>
                <span className="step-label " style={{ marginTop: '5px', color: labelColor , fontSize: 'large' }}>
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
            icon: 'pi pi-clipboard',
            label: 'Video',
            template: (item) => itemRenderer(item, 2)
        },
        {
            icon: 'pi pi-check',
            label: 'Evaluer',
            template: (item) => itemRenderer(item, 3)
        }
    ];

    const validate = async () => {
        try {
            const response = await axiosDB.put('/notes/update',{
                id :  notes.id,
                comentaire : comment,
                qualite_note : qualite,
                inovation_note : inovation,
                pertinence_note : partinence,
                effort_note : effort,
                env_note : env,
                id_projet : project_id,
            })

            console.log(response);
            router.push('/home');
        } catch (error){
            console.error('Error validating notes:',error);
        }
    }
    
    return (
        <div className="card max-h-screen h-[50rem] relative">
            <Steps model={items} activeIndex={activeIndex} readOnly={false} className="m-2 pt-4" />
            {activeIndex === 0 ? (
                <Info projet={project} />
            ) : activeIndex === 1 ? (
                <PdfViewer src={pdf} />
            ) : activeIndex === 2 ? (
                <MyVideo />
            ) : (
                <Note notes={notes} onValuesChange={handleValuesChange} />
            )}
            <div className="flex gap-3 absolute bottom-4 right-4">
                <Button label="valider" icon="pi pi-check" iconPos="right" onClick={validate} disabled={validerDisabled} />
                <Link href='/home'>
                    <Button label="fermer" severity="secondary" icon="pi pi-times" iconPos="right" />
                </Link>
            </div>
        </div>
    );
}
