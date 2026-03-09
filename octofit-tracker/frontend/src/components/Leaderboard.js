import { useEffect, useState } from 'react';
import EntityTableView from './EntityTableView';

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    async function fetchLeaderboard() {
      setLoading(true);
      setError('');

      try {
        console.log('Leaderboard endpoint:', endpoint);
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const payload = await response.json();
        console.log('Leaderboard fetched data:', payload);

        const normalized = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.results)
          ? payload.results
          : [];

        setItems(normalized);
      } catch (fetchError) {
        console.error('Leaderboard fetch error:', fetchError);
        setError('Unable to load leaderboard.');
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, [endpoint]);

  return (
    <EntityTableView
      title="Leaderboard"
      description="Review rankings and compare performance across participants."
      docsHref={endpoint}
      loading={loading}
      error={error}
      items={items}
      primaryKeys={['username', 'name', 'team_name', 'title']}
    />
  );
}

export default Leaderboard;
