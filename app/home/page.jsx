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
          console.log('from home : ', response)
  
          setActiveProjects(Object.values(response.data.projects_noted));
          setInactiveProjects(Object.values(response.data.projects_not_noted))

  
      } catch (error) {
          console.error('Error fetching projects: ', error);
      }
      };

      fetchProjects();
    }, []);

    return (
        <div className="pt-1">
            <TabView className="w-full">
              <TabPanel header="Non-notés">
                <CustomTable data={inactiveProjects}/>
              </TabPanel>
              <TabPanel header="Notés">
                <CustomTable data={activeProjects}/>
              </TabPanel>
            </TabView>
        </div>
    );
};

export default Page;
