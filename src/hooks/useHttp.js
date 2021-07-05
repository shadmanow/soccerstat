import {useState, useCallback} from 'react';

export default function useHttp() {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const get = useCallback(async (url) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "X-Auth-Token": process.env.REACT_APP_API_KEY
        },
      });
      if (!response.ok) {
        setError({
          status: response.status,
          statusText: response.statusText
        });
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (e) {
      setLoading(false);
      throw e;
    }
  }, []);

  return [get, loading, error];
}