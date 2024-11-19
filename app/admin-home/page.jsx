'use client';

import { useEffect, useState } from 'react';
import { axiosDB } from '../api/axiosDB';
import RankedTable from '../components/RankedTable';
import { useLoading } from '../contexts/LoadingContext';
import Link from 'next/link';
import { Button } from 'primereact/button';

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

    const exportExcel = async () =>{
      try{
        const response = await axiosDB.get('/export', { responseType: 'blob' }); // Ensure the response is treated as a blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'projects.xlsx'); // Set file name
            document.body.appendChild(link);
            link.click();
            link.remove();
            console.log('Excel exported successfully');
      } catch (error) {
        console.error('Error exporting EXCEL:', error)
      }
    }

    return (
        <div className='card '>
            <RankedTable data={projects}/>
            <div className='w-full flex flex-row-reverse'>
              <Button label="Export" severity="success" icon="pi pi-download" iconPos="right" onClick={exportExcel}/>
            </div>
        </div>
    );
};

export default Page;
