import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Link from 'next/link';

const RankedTable = ({ data }) => {
  const [filters, setFilters] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const updateRowsPerPage = () => {
      const pageHeight = window.innerHeight;
      const rows = Math.floor((pageHeight - 400) / 50); // Adjust height for table + headers
      setRowsPerPage(rows > 0 ? rows : 5);
    };

    window.addEventListener('resize', updateRowsPerPage);
    updateRowsPerPage();

    return () => {
      window.removeEventListener('resize', updateRowsPerPage);
    };
  }, []);

  const projectIdTemplate = (rowData, { rowIndex }) => {
    return <span>N° {rowIndex + 1}</span>;
  };

  const projectNameBodyTemplate = (rowData) => {
    return <span>{rowData.intitule}</span>;
  };

  const countryBodyTemplate = (rowData) => {
    return <span>{rowData.nationalite}</span>;
  };

  const representativeBodyTemplate = (rowData) => {
    return <span>{rowData.projet_porteur}</span>;
  };

  const moyenneBodyTemplate = (rowData) => {
    return <span>{rowData.note_total}</span>;
  };

  return (
    <div className="p-datatable-container">
      <DataTable
        value={data}
        paginator
        rows={rowsPerPage}
        filters={filters}
        onFilter={(e) => setFilters(e.filters)}
        selection={selectedCustomer}
        onSelectionChange={(e) => setSelectedCustomer(e.value)}
        selectionMode="single"
        dataKey="id"
        emptyMessage="No projects found."
        responsiveLayout="scroll"
        tableStyle={{ width: '100%' }}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} à {last} de {totalRecords} projets"
      >
        <Column 
          field="classement" 
          header="Classement" 
          body={projectIdTemplate} 
          style={{ minWidth: '8rem' }} 
        />

        <Column 
          field="name" 
          header="Projet" 
          body={projectNameBodyTemplate} 
          style={{ minWidth: '12rem' }} 
        />

        <Column 
          header="Pays" 
          body={countryBodyTemplate} 
          style={{ minWidth: '10rem' }} 
        />

        <Column 
          header="Porteur du projet" 
          body={representativeBodyTemplate} 
          style={{ minWidth: '12rem' }} 
        />

        <Column 
          header="Moyenne" 
          body={moyenneBodyTemplate} 
          style={{ minWidth: '8rem' }} 
        />

        <Column
          header="Action"
          body={(rowData) => (
            <Link 
              href={{
                pathname: '/admin-home/admin-show',
                query: { project_id: JSON.stringify(rowData.id) },
              }}
            >
              <Button label="Afficher" className="h-8" />
            </Link>
          )}
          style={{ minWidth: '8rem' }}
        />
      </DataTable>
    </div>
  );
};

export default RankedTable;
