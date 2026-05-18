import { useEffect, useState } from 'react';
import './App.css';
import { Folder } from './components/Folder/Folder';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

function App() {
  const [tree, setTree] = useState<TreeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/tree`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<TreeResponse>;
      })
      .then(setTree)
      .catch((e: Error) => setError(e.message));
  }, []);

  if (error) return <pre style={{ color: 'crimson' }}>Error: {error}</pre>;
  if (!tree) return <p>Loading…</p>;

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: 16 }}>
      <h1>File tree</h1>
      <Folder content={tree.root} folderName='root'/>
    </main>
  );
}

export default App;
