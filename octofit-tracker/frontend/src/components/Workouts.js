import { useEffect, useState } from 'react';
import EntityTableView from './EntityTableView';

function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    async function fetchWorkouts() {
      setLoading(true);
      setError('');

      try {
        console.log('Workouts endpoint:', endpoint);
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const payload = await response.json();
        console.log('Workouts fetched data:', payload);

        const normalized = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.results)
          ? payload.results
          : [];

        setItems(normalized);
      } catch (fetchError) {
        console.error('Workouts fetch error:', fetchError);
        setError('Unable to load workouts.');
      } finally {
        setLoading(false);
      }
    }

    fetchWorkouts();
  }, [endpoint]);

  return (
    <EntityTableView
      title="Workouts"
      description="View workout catalog entries and inspect complete details on demand."
      docsHref={endpoint}
      loading={loading}
      error={error}
      items={items}
      primaryKeys={['name', 'workout_name', 'title']}
    />
  );
}

export default Workouts;
