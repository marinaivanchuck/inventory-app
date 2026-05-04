import { createContext, useContext, useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5000';

const InventoryContext = createContext();

export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_BASE}/inventory`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const createItem = async (formData) => {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('Create failed');
    const newItem = await res.json();
    setItems(prev => [...prev, newItem]);
    return newItem;
  };

  const updateItemText = async (id, data) => {
    const res = await fetch(`${API_BASE}/inventory/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Update failed');
    const updated = await res.json();
    setItems(prev => prev.map(i => i.id === id ? updated : i));
    return updated;
  };

  const updateItemPhoto = async (id, photoFile) => {
    const formData = new FormData();
    formData.append('photo', photoFile);
    const res = await fetch(`${API_BASE}/inventory/${id}/photo`, {
      method: 'PUT',
      body: formData,
    });
    if (!res.ok) throw new Error('Photo update failed');
    const updated = await res.json();
    setItems(prev => prev.map(i => i.id === id ? updated : i));
    return updated;
  };

  const deleteItem = async (id) => {
    const res = await fetch(`${API_BASE}/inventory/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Delete failed');
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <InventoryContext.Provider value={{
      items, loading, error,
      createItem, updateItemText, updateItemPhoto, deleteItem, refetch: fetchItems
    }}>
      {children}
    </InventoryContext.Provider>
  );
};
