import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CustomTable = ({ data }) => {
  const router = useRouter();
  const [filters, setFilters] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(4); 

  useEffect(() => {
    const updateRowsPerPage = () => {
      const pageHeight = window.innerHeight;
      // Calculate number of rows based on the height of the page (you can adjust this factor as needed)
      const rows = Math.floor((pageHeight - 400) / 50); // Subtract some padding and use 50px per row as a rough estimate
      setRowsPerPage(rows > 0 ? rows : 4); // Ensure at least 4 rows
    };

    // Update rows when the page is resized
    window.addEventListener('resize', updateRowsPerPage);

    // Initial calculation
    updateRowsPerPage();

    return () => {
      window.removeEventListener('resize', updateRowsPerPage); // Cleanup event listener
    };
  }, []);

  const countryBodyTemplate = (rowData) => {
    return <span>{rowData.nationalite}</span>;
  };

  const projectNameBodyTemplate = (rowData) => {
    return <span>{rowData.intitule}</span>;
  };

  const representativeBodyTemplate = (rowData) => {
    return <span>{rowData.projet_porteur}</span>;
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
        tableStyle={{ width: '100%' }}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} a {last} de {totalRecords}"
      >
        <Column header="Pays" body={countryBodyTemplate} style={{ minWidth: '150px', flex: '1 1 150px' }} />
        <Column header="Agent" body={representativeBodyTemplate} style={{ minWidth: '150px', flex: '1 1 150px' }} />
        <Column
          header="Action"
          body={(rowData) => (
            <Link href={{ pathname: '/home/show', query: { project_id: JSON.stringify(rowData.id) } }}>
              <Button label="Noter" className="h-8" />
            </Link>
          )}
          style={{ minWidth: '150px', flex: '1 1 150px' }}
        />
      </DataTable>
    </div>
  );
};

export default CustomTable;
