'use client';

import { useEffect, useState } from 'react';
import { axiosDB } from '../api/axios';
import { TabPanel, TabView } from 'primereact/tabview';
import CustomTable from '../components/CustomTable';
import { useLoading } from '../contexts/LoadingContext';

const Page = () => {
  const {setLoading} = useLoading(); 

    const [activeProjects, setActiveProjects] = useState([]);
    const [inactiveProjects, setInactiveProjects] = useState([]);

    useEffect(() => {
      const fetchProjects = async () => {
        setLoading(true);
        try {
          const response = await axiosDB.get('/projects');
          console.log('from home : ', response)
  
          setActiveProjects(Object.values(response.data.projects_noted));
          setInactiveProjects(Object.values(response.data.projects_not_noted))

  
      } catch (error) {
          console.error('Error fetching projects: ', error);
      } finally {
        setLoading(false);
      }
      };

      fetchProjects();
    }, [setLoading]);

    return (
        <div className="pt-1">
            <TabView className="w-full">
              <TabPanel header="Non-évalués">
                <CustomTable data={inactiveProjects}/>
              </TabPanel>
              <TabPanel header="Evalués">
                <CustomTable data={activeProjects}/>
              </TabPanel>
            </TabView>
        </div>
    );
};

export default Page;
