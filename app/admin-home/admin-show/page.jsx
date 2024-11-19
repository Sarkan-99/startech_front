'use client';

import React, { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { axiosDB } from '../../api/axiosDB';
import { useLoading } from '../../contexts/LoadingContext';

const Page = () => {
  const { setLoading } = useLoading();
  const searchParams = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedProf, setSelectedProf] = useState(null);
  const [selectedComment, setSelectedComment] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(4); // Dynamically updated rows per page
  const dataTableRef = useRef(null);

  useEffect(() => {
    const updateRowsPerPage = () => {
      const pageHeight = window.innerHeight;
      const rows = Math.floor((pageHeight - 400) / 50);
      setRowsPerPage(rows > 0 ? rows : 4);
    };

    window.addEventListener('resize', updateRowsPerPage);
    updateRowsPerPage();

    return () => {
      window.removeEventListener('resize', updateRowsPerPage);
    };
  }, []);

  useEffect(() => {
    const project_id = searchParams.get('project_id');
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const response = await axiosDB.get('/notes/projet', { params: { id_projet: project_id } });
        const notesData = response.data.notes;

        setNotes(Array.isArray(notesData) ? notesData : Object.values(notesData || {}));
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
    <div className="p-datatable-container">
      <DataTable
        ref={dataTableRef}
        value={notes}
        paginator
        rows={rowsPerPage}
        selection={selectedProf}
        onSelectionChange={(e) => setSelectedProf(e.value)}
        selectionMode="single"
        dataKey="id"
        emptyMessage="Aucune note trouvée."
        tableStyle={{ width: '100%' }}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} à {last} de {totalRecords}"
      >
        <Column field="code" header="Prof" body={(rowData) => <span>{rowData.prof.nom_complet}</span>} style={{ minWidth: '120px' }} />
        <Column field="qualite_note" header="Qualité" style={{ minWidth: '100px' }} />
        <Column field="effort_note" header="Effort" style={{ minWidth: '100px' }} />
        <Column field="inovation_note" header="Innovation" style={{ minWidth: '100px' }} />
        <Column field="env_note" header="Environnement" style={{ minWidth: '100px' }} />
        <Column field="pertinence_note" header="Pertinence" style={{ minWidth: '100px' }} />
        <Column field="total" header="Total" style={{ minWidth: '100px' }} />
        <Column
          header="Commentaire"
          body={(rowData) => (
            <Button label="Voir" className="h-8" onClick={() => openDialog(rowData.comentaire)} />
          )}
          style={{ minWidth: '120px' }}
        />
      </DataTable>
      <Dialog header="Commentaire" visible={visible} style={{ width: '50vw' }} onHide={closeDialog} draggable={false}>
        <p className="m-0">{selectedComment}</p>
      </Dialog>
      <Link href="/admin-home">
        <Button label="Fermer" severity="Secondary" icon="pi pi-times" className="mt-4" />
      </Link>
    </div>
  );
};

export default Page;
