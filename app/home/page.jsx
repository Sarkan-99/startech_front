'use client';

import { useEffect, useState } from 'react';
import { axiosDB } from '../api/axios';
import { TabPanel, TabView } from 'primereact/tabview';
import CustomTable from '../components/CustomTable';

const Page = () => {    

    const [activeProjects, setActiveProjects] = useState([]);
    const [inactiveProjects, setInactiveProjects] = useState([]);

    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const response = await axiosDB.get('/projects');
  
          const projectsArray = Object.values(response.data.projects);
          
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
