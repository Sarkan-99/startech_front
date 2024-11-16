'use client';

import { useEffect, useState } from 'react';
import { axiosDB } from '../api/axios';
import RankedTable from '../components/RankedTable';

const Page = () => {    
    const [projects, setProjects] = useState([]);

    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const response = await axiosDB.get('/get_all_projects');
         
            const projectsArray = Object.values(response.data.result);
            setProjects(projectsArray);
            console.log('projects : ', projectsArray)
  
      } catch (error) {
          console.error('Error fetching projects: ', error);
      }
      };

      fetchProjects();
    }, []);

    return (
        <div className='card'>
            <RankedTable data={projects}/>
        </div>
    );
};

export default Page;
