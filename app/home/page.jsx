'use client';

import { useEffect, useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { axiosDB } from '../api/axios';
import { TabPanel, TabView } from 'primereact/tabview';
import CustomTable from '../components/CustomTable';

const Page = () => {    

    const [projects, setProjects] = useState([]);
    const [activeProjects, setActiveProjects] = useState([]);
    const [inactiveProjects, setInactiveProjects] = useState([]);

<<<<<<< HEAD
    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const response = await axiosDB.get('/projects');
          console.log('Fetched data:', response.data);
          setProjects(response.data.projects);
  
          const projectsArray = Object.values(response.data.projects);
          console.log('projects Array : ', projectsArray);
          
          setActiveProjects(projectsArray.filter(project => project.statut == 1));
          setInactiveProjects(projectsArray.filter(project => project.statut == 0));
  
      } catch (error) {
          console.error('Error fetching projects: ', error);
      }
      };
=======
    // Different datasets for each tab
    const dashboardData = [
        { id: 1, name: 'John Doe', country: { name: 'USA' }, representative: { name: 'Amy Elsner' }, status: 'qualified' },
        { id: 2, name: 'Jane Smith', country: { name: 'Germany' }, representative: { name: 'Elwin Sharvill' }, status: 'new' },
        { id: 3, name: 'Alex Johnson', country: { name: 'Brazil' }, representative: { name: 'Asiya Javayant' }, status: 'renewal' },
        { id: 4, name: 'Alex Johnson', country: { name: 'Brazil' }, representative: { name: 'Asiya Javayant' }, status: 'renewal' },
        { id: 5, name: 'Alex Johnson', country: { name: 'Brazil' }, representative: { name: 'Asiya Javayant' }, status: 'renewal' },
        { id: 6, name: 'Alex Johnson', country: { name: 'Brazil' }, representative: { name: 'Asiya Javayant' }, status: 'renewal' },
        { id: 7, name: 'Alex Johnson', country: { name: 'Brazil' }, representative: { name: 'Asiya Javayant' }, status: 'renewal' },
        { id: 8, name: 'Alex Johnson', country: { name: 'Brazil' }, representative: { name: 'Asiya Javayant' }, status: 'renewal' },

    
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
>>>>>>> 7c7284f75f317ba2dc7211caaec50913b97b944f

      fetchProjects();
    }, []);

    return (
        <div className='card'>
<<<<<<< HEAD
            <TabView  >
              <TabPanel header="Non-notéé">
                <CustomTable data={inactiveProjects}/>
              </TabPanel>
              <TabPanel header="Notéé">
                <CustomTable data={activeProjects}/>
              </TabPanel>
            </TabView>
=======
            <div className="card flex justify-center">
                <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
            </div>

            <div className="card">
                <DataTable value={customers} paginator rows={5} filters={filters} onFilter={(e) => setFilters(e.filters)}
                    selection={selectedCustomer} onSelectionChange={(e) => setSelectedCustomer(e.value)} selectionMode="single" dataKey="id"
                    emptyMessage="No customers found." tableStyle={{ minWidth: '50rem' }}>
                    
                    <Column field="name" header="Name" sortable  style={{ width: '25%' }}></Column>
                    <Column header="Owner" body={countryBodyTemplate} sortable style={{ width: '25%' }}></Column>
                    <Column header="Activity" body={representativeBodyTemplate} sortable style={{ width: '25%' }}></Column>
                    <Column field="status" header="Status" body={statusBodyTemplate} sortable style={{ width: '25%' }}></Column>
                </DataTable>
            </div>
>>>>>>> 7c7284f75f317ba2dc7211caaec50913b97b944f
        </div>
    );
};

export default Page;
