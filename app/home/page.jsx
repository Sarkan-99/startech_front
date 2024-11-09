'use client';
import { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';

const Page = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [filters, setFilters] = useState({
        global: { value: null },
        name: { value: null },
        country: { value: null },
        representative: { value: null },
        status: { value: null }
    });
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const items = [
        { label: 'Non-notéé', icon: 'pi pi-home' },
        { label: 'Notéé', icon: 'pi pi-chart-line' }
    ];

    // Different datasets for each tab
    const dashboardData = [
        { id: 1, name: 'John Doe', country: { name: 'USA' }, representative: { name: 'Amy Elsner' }, status: 'qualified' },
        { id: 2, name: 'Jane Smith', country: { name: 'Germany' }, representative: { name: 'Elwin Sharvill' }, status: 'new' },
        { id: 3, name: 'Alex Johnson', country: { name: 'Brazil' }, representative: { name: 'Asiya Javayant' }, status: 'renewal' }
    ];

    const transactionData = [
        { id: 4, name: 'Chris Black', country: { name: 'UK' }, representative: { name: 'Stephen Shaw' }, status: 'negotiation' },
        { id: 5, name: 'Lucy Brown', country: { name: 'Canada' }, representative: { name: 'Onyama Limba' }, status: 'unqualified' },
        { id: 6, name: 'Emma Wilson', country: { name: 'France' }, representative: { name: 'Ivan Magalhaes' }, status: 'qualified' }
    ];

    // Select the dataset based on the active tab
    const customers = activeIndex === 0 ? dashboardData : transactionData;

    const statuses = ['unqualified', 'qualified', 'new', 'negotiation', 'renewal'];

    const getSeverity = (status) => {
        switch (status) {
            case 'unqualified':
                return 'danger';
            case 'qualified':
                return 'success';
            case 'new':
                return 'info';
            case 'negotiation':
                return 'warning';
            default:
                return null;
        }
    };

    const countryBodyTemplate = (rowData) => (
        <div className="flex align-items-center gap-2">
            <span>{rowData.country.name}</span>
        </div>
    );

    const representativeBodyTemplate = (rowData) => (
        <div className="flex align-items-center gap-2">
            <span>{rowData.representative.name}</span>
        </div>
    );

    const statusBodyTemplate = (rowData) => (
        <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );


    return (
        <div className='card'>
            <div className="card flex justify-center mt-10">
                <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
            </div>

            <div className="card mt-5">
                <DataTable value={customers} paginator rows={5} filters={filters} onFilter={(e) => setFilters(e.filters)}
                    selection={selectedCustomer} onSelectionChange={(e) => setSelectedCustomer(e.value)} selectionMode="single" dataKey="id"
                    emptyMessage="No customers found." tableStyle={{ minWidth: '50rem' }}>
                    
                    <Column field="name" header="Name" sortable  style={{ width: '25%' }}></Column>
                    <Column header="Owner" body={countryBodyTemplate} sortable style={{ width: '25%' }}></Column>
                    <Column header="Activity" body={representativeBodyTemplate} sortable style={{ width: '25%' }}></Column>
                    <Column field="status" header="Status" body={statusBodyTemplate} sortable style={{ width: '25%' }}></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default Page;
