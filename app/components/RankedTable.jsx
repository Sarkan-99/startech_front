import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RankedTable = ({ data }) => {
  const router = useRouter();
  const [filters, setFilters] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const countryBodyTemplate = (rowData) => {
    return <span>{rowData.nationalite}</span>;
  };

  const projectNameBodyTemplate = (rowData) => {
    return <span>{rowData.intitule}</span>;
  };

  const representativeBodyTemplate = (rowData) => {
    return <span>{rowData.projet_porteur}</span>;
  };

  const projectIdTemplate = (rowData, { rowIndex }) => {
    return <span>N° {rowIndex + 1}</span>;
  };

  const moyenneBodyTemplate = (rowData) => {
    return <span>{rowData.note_total}</span>
  }
  
  return (
    <DataTable
      value={data}
      paginator
      rows={5}
      filters={filters}
      onFilter={(e) => setFilters(e.filters)}
      selection={selectedCustomer}
      onSelectionChange={(e) => setSelectedCustomer(e.value)}
      selectionMode="single"
      dataKey="id"
      emptyMessage="No projects found."
      tableStyle={{ minWidth: '50rem' }}>
      
      <Column field="classement" header="Classement" body={projectIdTemplate}/>

      <Column field="name" header="Projet" body={projectNameBodyTemplate} style={{ width: '25%' }} />

      <Column header="Pays" body={countryBodyTemplate} style={{ width: '25%' }} />

      <Column header="Porteur du projet" body={representativeBodyTemplate} style={{ width: '25%' }} />
      <Column header="Moyenne" body={moyenneBodyTemplate} style={{ width: '25%' }} />
      <Column
        header="Action"
        body={(rowData) => (
          <Link href={{ pathname: '/admin-home/admin-show', query: { project_id: JSON.stringify(rowData.id) } }}>
            <Button label="Afficher" className="h-8" />
          </Link>
        )}
      />
    </DataTable>
  );
};

export default RankedTable;
