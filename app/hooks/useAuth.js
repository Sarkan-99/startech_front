import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('google_access_token');
    if (!token) {
      router.push('/');
    }
  }, [router]);
};

export default useAuth;
