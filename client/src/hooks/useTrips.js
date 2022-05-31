import { useState, useEffect } from 'react';
import { getTrips } from '../api/tripsApi';

export default function useTrips() {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const response = await getTrips();
        setTrips(response.data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  return { trips, error, loading };
}
