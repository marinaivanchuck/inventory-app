import { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import ViewModal from './ViewModal';
import EditModal from './EditModal';
import ConfirmDelete from './ConfirmDelete';

const API_BASE = 'http://localhost:5001';

export default function InventoryTable() {
  const { items, deleteItem } = useInventory();
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = async () => {
    if (deleteId) {
      await deleteItem(deleteId);
      setDeleteId(null);
    }
  };

  if (items.length === 0) {
    return <div className="text-center py-10 text-gray-500">Інвентар 
порожній. Додайте позиції.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left">Назва</th>
            <th className="py-3 px-4 text-left">Опис</th>
            <th className="py-3 px-4 text-left">Фото</th>
            <th className="py-3 px-4 text-left">Дії</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{item.inventory_name}</td>
              <td className="py-2 px-4">{item.description?.slice(0, 
50)}</td>
              <td className="py-2 px-4">
                {item.photo && (
                  <img src={`${API_BASE}${item.photo}`} alt="preview" 
className="w-12 h-12 object-cover rounded" />
                )}
              </td>
              <td className="py-2 px-4 space-x-2">
                <button onClick={() => setViewItem(item)} 
className="text-blue-600 hover:underline">Переглянути</button>
                <button onClick={() => setEditItem(item)} 
className="text-yellow-600 hover:underline">Редагувати</button>
                <button onClick={() => setDeleteId(item.id)} 
className="text-red-600 hover:underline">Видалити</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {viewItem && <ViewModal item={viewItem} onClose={() => 
setViewItem(null)} />}
      {editItem && <EditModal item={editItem} onClose={() => 
setEditItem(null)} />}
      {deleteId && <ConfirmDelete onConfirm={handleDelete} onCancel={() => 
setDeleteId(null)} />}
    </div>
  );
}
