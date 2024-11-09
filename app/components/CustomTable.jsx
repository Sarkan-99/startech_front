import React from 'react'

const CustomTable = ({ data}) => {

  return (
    <DataTable value={customers} paginator rows={5} filters={filters} onFilter={(e) => setFilters(e.filters)}
        selection={selectedCustomer} onSelectionChange={(e) => setSelectedCustomer(e.value)} selectionMode="single" dataKey="id"
        emptyMessage="No customers found." tableStyle={{ minWidth: '50rem' }}>
        
        <Column field="name" header="Name" sortable  style={{ width: '25%' }}></Column>
        <Column header="Country" body={countryBodyTemplate} sortable style={{ width: '25%' }}></Column>
        <Column header="Agent" body={representativeBodyTemplate} sortable style={{ width: '25%' }}></Column>
        <Column field="status" header="Status" body={statusBodyTemplate} sortable style={{ width: '25%' }}></Column>
    </DataTable>
  )
}

export default CustomTable