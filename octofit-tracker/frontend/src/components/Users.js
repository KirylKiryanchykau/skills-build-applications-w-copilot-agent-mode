import { useEffect, useState } from 'react';
import EntityTableView from './EntityTableView';
import { buildApiEndpoint } from '../utils/api';

function Users() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const endpoint = buildApiEndpoint('users');

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setError('');

      try {
        console.log('Users endpoint:', endpoint);
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const payload = await response.json();
        console.log('Users fetched data:', payload);

        const normalized = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.results)
          ? payload.results
          : [];

        setItems(normalized);
      } catch (fetchError) {
        console.error('Users fetch error:', fetchError);
        setError('Unable to load users.');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [endpoint]);

  return (
    <EntityTableView
      title="Users"
      description="Explore user profiles and compare account fields in a unified table."
      docsHref={endpoint}
      loading={loading}
      error={error}
      items={items}
      primaryKeys={['username', 'name', 'email', 'title']}
    />
  );
}

export default Users;
