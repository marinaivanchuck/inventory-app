import { useState } from 'react';
import { useInventory } from '../context/InventoryContext';

export default function CreateForm({ onSuccess }) {
  const { createItem } = useInventory();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Назва обов\'язкова');
      return;
    }
    const formData = new FormData();
    formData.append('inventory_name', name);
    formData.append('description', description);
    if (photo) formData.append('photo', photo);
    try {
      await createItem(formData);
      setName('');
      setDescription('');
      setPhoto(null);
      setError('');
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Помилка створення');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg 
mb-6">
      <h3 className="text-lg font-bold mb-2">Додати нову позицію</h3>
      {error && <p className="text-red-500">{error}</p>}
      <input type="text" placeholder="Назва *" value={name} onChange={e => 
setName(e.target.value)} className="border p-2 w-full mb-2 rounded" />
      <textarea placeholder="Опис" value={description} onChange={e => 
setDescription(e.target.value)} className="border p-2 w-full mb-2 rounded" 
/>
      <input type="file" accept="image/*" onChange={e => 
setPhoto(e.target.files[0])} className="mb-2" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 
rounded hover:bg-green-700">Створити</button>
    </form>
  );
}
