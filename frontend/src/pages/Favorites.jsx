import { useState, useEffect } from 'react';
import { useInventory } from '../context/InventoryContext';
import QuickViewModal from '../components/QuickViewModal';

const API_BASE = 'http://localhost:5000';

export default function Favorites() {
  const { items } = useInventory();
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) setFavoriteIds(JSON.parse(stored));
  }, []);

  const removeFavorite = (id, e) => {
    e.stopPropagation();
    const newFavs = favoriteIds.filter(fid => fid !== id);
    setFavoriteIds(newFavs);
    localStorage.setItem('favorites', JSON.stringify(newFavs));
  };

  const favoriteItems = items.filter(item => 
favoriteIds.includes(item.id));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Улюблені 
позиції</h1>
      {favoriteItems.length === 0 ? (
        <p className="text-center text-gray-500">Немає улюблених. Додайте 
з галереї ❤️</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
gap-6">
          {favoriteItems.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg 
overflow-hidden cursor-pointer" onClick={() => setSelectedItem(item)}>
              <img src={`${API_BASE}${item.photo}`} 
alt={item.inventory_name} className="w-full h-48 object-cover" />
              <div className="p-4 flex justify-between items-center">
                <h3 className="font-bold">{item.inventory_name}</h3>
                <button onClick={(e) => removeFavorite(item.id, e)} 
className="text-red-500 text-2xl">❤️</button>
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
