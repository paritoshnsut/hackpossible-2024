import { useState, useEffect , useRef } from 'react';
import { fetchReadingById , fetchHeatmapData , fetchReadings , fetchThresholdReadingById } from '.';


export const useFetchReadingById = (id: string | undefined) => {
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
    interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval); 
  }, [id]);

  return { data, error, isLoading };
};

export const useHeatmapData = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadHeatmapData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchHeatmapData();
      setData(result);
    } catch (err) {
      console.log('pk' , err)
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, loadHeatmapData };
};

export const useFetchReadings = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>(true);

  useEffect(() => {
    let interval: any
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchReadings();
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
    interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  return { data, error, isLoading };
};


const useFetchThresholdReading = (id : any) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await fetchThresholdReadingById(id);
      setData(result?.data);
      setError(null);
    } catch (error) {
   
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, fetchData };
};

export default useFetchThresholdReading;

