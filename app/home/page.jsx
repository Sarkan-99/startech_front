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

      fetchProjects();
    }, []);

    return (
        <div className='card'>
            <TabView  >
              <TabPanel header="Non-notéé">
                <CustomTable data={inactiveProjects}/>
              </TabPanel>
              <TabPanel header="Notéé">
                <CustomTable data={activeProjects}/>
              </TabPanel>
            </TabView>
        </div>
    );
};

export default Page;
