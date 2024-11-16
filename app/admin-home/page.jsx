'use client';

import { useEffect, useState } from 'react';
import { axiosDB } from '../api/axios';
import RankedTable from '../components/RankedTable';
import { useLoading } from '../contexts/LoadingContext';

const Page = () => {    
    const [projects, setProjects] = useState([]);
    const { setLoading } = useLoading();

    useEffect(() => {
      const fetchProjects = async () => {
        setLoading(true);
        try {
          const response = await axiosDB.get('/get_all_projects');
         
            const projectsArray = Object.values(response.data.result);
            setProjects(projectsArray);
  
      } catch (error) {
          console.error('Error fetching projects: ', error);
      } finally {
        setLoading(false);
      }
      };

      fetchProjects();
    }, [setLoading]);

    return (
        <div className='card'>
            <RankedTable data={projects}/>
        </div>
    );
};

export default Page;
