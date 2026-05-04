import { useState, useEffect } from 'react';
import { useInventory } from '../context/InventoryContext';
import QuickViewModal from '../components/QuickViewModal';
import LoadingSpinner from '../components/LoadingSpinner';

const API_BASE = 'http://localhost:5000';

export default function Gallery() {
  const { items, loading, error } = useInventory();
  const [favorites, setFavorites] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const toggleFavorite = (itemId, e) => {
    e.stopPropagation();
    let newFavs;
    if (favorites.includes(itemId)) {
      newFavs = favorites.filter(id => id !== itemId);
    } else {
      newFavs = [...favorites, itemId];
    }
    setFavorites(newFavs);
    localStorage.setItem('favorites', JSON.stringify(newFavs));
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center 
mt-10">Помилка: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Галерея 
інвентарю</h1>
      {items.length === 0 ? (
        <div className="text-center py-10 text-gray-500">Інвентар 
порожній. Увійдіть в адмін-панель, щоб додати позиції.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
lg:grid-cols-4 gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg 
overflow-hidden cursor-pointer transform transition hover:scale-105 
hover:shadow-2xl" onClick={() => setSelectedItem(item)}>
              <div className="relative">
                <img src={`${API_BASE}${item.photo}`} 
alt={item.inventory_name} className="w-full h-48 object-cover" />
                <button onClick={(e) => toggleFavorite(item.id, e)} 
className="absolute top-2 right-2 text-2xl drop-shadow">
                  {favorites.includes(item.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold 
text-lg">{item.inventory_name}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedItem && <QuickViewModal item={selectedItem} onClose={() => 
setSelectedItem(null)} />}
    </div>
  );
}
