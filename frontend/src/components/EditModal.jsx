import { useState } from 'react';
import { useInventory } from '../context/InventoryContext';

export default function EditModal({ item, onClose }) {
  const { updateItemText, updateItemPhoto } = useInventory();
  const [name, setName] = useState(item.inventory_name);
  const [description, setDescription] = useState(item.description || '');
  const [photoFile, setPhotoFile] = useState(null);

  const handleTextUpdate = async () => {
    await updateItemText(item.id, { inventory_name: name, description });
    onClose();
  };

  const handlePhotoUpdate = async () => {
    if (photoFile) {
      await updateItemPhoto(item.id, photoFile);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center 
justify-center p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Редагувати</h2>
        <input value={name} onChange={e => setName(e.target.value)} 
className="border p-2 w-full mb-2 rounded" />
        <textarea value={description} onChange={e => 
setDescription(e.target.value)} className="border p-2 w-full mb-4 rounded" 
/>
        <button onClick={handleTextUpdate} className="bg-blue-600 
text-white px-4 py-2 rounded w-full mb-2">Оновити текст</button>
        <input type="file" accept="image/*" onChange={e => 
setPhotoFile(e.target.files[0])} className="mb-2" />
        <button onClick={handlePhotoUpdate} className="bg-green-600 
text-white px-4 py-2 rounded w-full">Оновити фото</button>
        <button onClick={onClose} className="mt-2 text-gray-500 
w-full">Скасувати</button>
      </div>
    </div>
  );
}
