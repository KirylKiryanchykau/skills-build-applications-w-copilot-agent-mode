import { useEffect, useState } from 'react';
import EntityTableView from './EntityTableView';
import { buildApiEndpoint } from '../utils/api';

function Teams() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const endpoint = buildApiEndpoint('teams');

  useEffect(() => {
    async function fetchTeams() {
      setLoading(true);
      setError('');

      try {
        console.log('Teams endpoint:', endpoint);
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const payload = await response.json();
        console.log('Teams fetched data:', payload);

        const normalized = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.results)
          ? payload.results
          : [];

        setItems(normalized);
      } catch (fetchError) {
        console.error('Teams fetch error:', fetchError);
        setError('Unable to load teams.');
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, [endpoint]);

  return (
    <EntityTableView
      title="Teams"
      description="Manage team records and view roster-related fields at a glance."
      docsHref={endpoint}
      loading={loading}
      error={error}
      items={items}
      primaryKeys={['name', 'team_name', 'title']}
    />
  );
}

export default Teams;
