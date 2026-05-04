import { useState, useEffect } from 'react';
import { useInventory } from '../context/InventoryContext';
import QuickViewModal from '../components/QuickViewModal';
import SkeletonGrid from '../components/SkeletonGrid';

const API_BASE = 'http://localhost:5001';

export default function Gallery() {
  const { items, loading, error, refetch } = useInventory();
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

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-red-500 text-xl mb-4">Помилка завантаження: {error}</div>
        <button onClick={refetch} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">Спробувати знову</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">📦 Галерея інвентарю</h1>
        {loading ? (
          <SkeletonGrid />
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🪴</div>
            <h3 className="text-2xl font-semibold text-gray-600">Інвентар порожній</h3>
            <p className="text-gray-400 mt-2">Додайте перші предмети в адмін-панелі</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {items.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="relative h-56 bg-gray-100 overflow-hidden">
                  {item.photo ? (
                    <img
                      src={`${API_BASE}${item.photo}`}
                      alt={item.inventory_name}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">🖼️</div>
                  )}
                  <button
                    onClick={(e) => toggleFavorite(item.id, e)}
                    className="absolute top-3 right-3 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl transition hover:scale-110 shadow-md"
                    aria-label="Додати в улюблені"
                  >
                    {favorites.includes(item.id) ? '❤️' : '🤍'}
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">{item.inventory_name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{item.description || 'Без опису'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedItem && <QuickViewModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
}
