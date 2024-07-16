import { useState, useEffect } from 'react';
import fetchReadingById from '.';

const useFetchReadingById = (id: string | undefined) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let interval: any
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchReadingById(id);
        setData(result);
        setError(null);
      } catch (error) {
        setError(error);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); 
    interval = setInterval(fetchData, 200000);

    return () => clearInterval(interval); 
  }, [id]);

  return { data, error, isLoading };
};

export default useFetchReadingById;
