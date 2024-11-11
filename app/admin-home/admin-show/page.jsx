'use client';

import { useSearchParams } from 'next/navigation';
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column';
import React, { useEffect, useState } from 'react'
import { axiosDB } from '../../api/axios';

const page = () => {
    const searchParams = useSearchParams();

    const [notes, setNotes] = useState([]);
    const [selectedProf, setSelectedProf] = useState(null);
    const project_id = searchParams.get('project_id');
    
    console.log(project_id)
    useEffect(() =>{
        const fetchNotes = async () => {
           try {
            const response = await axiosDB.post('/notes/projet', {
                    id_projet: project_id
            });
            const notesData = response.data.notes;
            setNotes(response.data.notes)
                if (notesData && typeof notesData === 'object') {
                    setNotes(Object.values(notesData));
                } else {
                    // setNotes(notesData || []);
                }

                console.log('Fetched notes:', notesData);
            
           } catch (error) {
            console.error('Error fetching notes : ', error);
           }
        };

        if(project_id) fetchNotes();
    },[project_id])

    return (
      <div>
          <DataTable
            value={notes}
            paginator
            rows={5}
            selection={selectedProf}
            onSelectionChange={(e) => setSelectedProf(e.value)}
            selectionMode='single'
            >
            <Column field="code" header="Prof"></Column>
            <Column field="name" header="Qualité"></Column>
            <Column field="category" header="Effort"></Column>
            <Column field="quantity" header="Innovation"></Column>
            <Column field="quantity" header="Enviroment"></Column>
            <Column field="quantity" header="Total"></Column>
            <Column field="quantity" header="Commentair"></Column>
          </DataTable>
      </div>
    )
}

export default page