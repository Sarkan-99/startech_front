import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CustomTable = ({ data }) => {
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

  return (
    <DataTable
      value={data}
      paginator
      rows={4}
      filters={filters}
      onFilter={(e) => setFilters(e.filters)}
      selection={selectedCustomer}
      onSelectionChange={(e) => setSelectedCustomer(e.value)}
      selectionMode="single"
      dataKey="id"
      emptyMessage="No projects found."
      tableStyle={{ height: '3rem' }}>
      
      <Column field="name" header="Project Name" body={projectNameBodyTemplate} style={{ width: '25%' }} />

      <Column header="Country" body={countryBodyTemplate} style={{ width: '25%' }} />

      <Column header="Agent" body={representativeBodyTemplate} style={{ width: '25%' }} />
      <Column
        header="Action"
        body={(rowData) => (
          <Link href={{ pathname: '/home/show', query: { project_id: JSON.stringify(rowData.id) } }}>
            <Button label="Noté" className="h-8" />
          </Link>
        )}
      />
    </DataTable>
  );
};

export default CustomTable;
