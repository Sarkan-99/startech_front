'use client';

import { useSearchParams } from 'next/navigation';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React, { useEffect, useState, useRef } from 'react';
import { axiosDB } from '../../api/axiosDB';
import { useLoading } from '../../contexts/LoadingContext';
import Link from 'next/link';

const Page = () => {
    const { setLoading } = useLoading();
    const searchParams = useSearchParams();
    const [notes, setNotes] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedProf, setSelectedProf] = useState(null);
    const [selectedComment, setSelectedComment] = useState("");
    const dataTableRef = useRef(null);

    useEffect(() => {
        const project_id = searchParams.get('project_id');
        const fetchNotes = async () => {
            setLoading(true);
            try {
                const response = await axiosDB.get('/notes/projet', {params: { "id_projet": project_id }});
                const notesData = response.data.notes;
                console.log('result from admin show : ', response.data);

                if (notesData && typeof notesData === 'object') {
                    setNotes(Object.values(notesData));
                } else {
                    setNotes(notesData || []);
                }

            } catch (error) {
                console.error('Error fetching notes:', error);
            } finally {
                setLoading(false);
            }
        };

        if (project_id) fetchNotes();
    }, [searchParams, setNotes, setLoading]);

    const openDialog = (comment) => {
        setSelectedComment(comment);
        setVisible(true);
    };

    const closeDialog = () => {
        setVisible(false);
    };

    return (
        <div>
            <DataTable
                ref={dataTableRef}
                value={notes}
                paginator
                rows={5}
                selection={selectedProf}
                onSelectionChange={(e) => setSelectedProf(e.value)}
                selectionMode="single"
            >
                <Column field="code" header="Prof" body={(rowData) => <span>{rowData.prof.nom_complet}</span>}/>
                <Column field="qualite_note" header="Qualité" body={(rowData) => <span>{rowData.qualite_note}</span>} />
                <Column field="effort_note" header="Effort" body={(rowData) => <span>{rowData.effort_note}</span>} />
                <Column field="inovation_note" header="Innovation" body={(rowData) => <span>{rowData.inovation_note}</span>} />
                <Column field="env_note" header="Environnement" body={(rowData) => <span>{rowData.env_note}</span>} />
                <Column field="pertinence_note" header="Pertinence" body={(rowData) => <span>{rowData.pertinence_note}</span>} />
                <Column field="total" header="Total" body={(rowData) => <span>{rowData.total}</span>} />
                <Column 
                    header="Commentaire" 
                    body={(rowData) => (
                        <div>
                            <Button label="Show Comment" className="h-8" onClick={() => openDialog(rowData.comentaire)} />
                        </div>
                    )}
                />
            </DataTable>
            <Dialog header="Comment" visible={visible} style={{ width: '50vw' }} onHide={closeDialog} draggable={false}>
                <p className="m-0">{selectedComment}</p>
            </Dialog>
            <Link href='/admin-home'>
                <Button label="fermer" severity="danger" icon="pi pi-times"  />
            </Link>
        </div>
    );
};

export default Page;