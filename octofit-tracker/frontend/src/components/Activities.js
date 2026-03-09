import { useEffect, useState } from 'react';
import EntityTableView from './EntityTableView';
import { buildApiEndpoint } from '../utils/api';

function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const endpoint = buildApiEndpoint('activities');

  useEffect(() => {
    async function fetchActivities() {
      setLoading(true);
      setError('');

      try {
        console.log('Activities endpoint:', endpoint);
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const payload = await response.json();
        console.log('Activities fetched data:', payload);

        const normalized = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.results)
          ? payload.results
          : [];

        setItems(normalized);
      } catch (fetchError) {
        console.error('Activities fetch error:', fetchError);
        setError('Unable to load activities.');
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, [endpoint]);

  return (
    <EntityTableView
      title="Activities"
      description="Browse logged activities and inspect each entry in a structured view."
      docsHref={endpoint}
      loading={loading}
      error={error}
      items={items}
      primaryKeys={['name', 'activity_name', 'title']}
    />
  );
}

export default Activities;
