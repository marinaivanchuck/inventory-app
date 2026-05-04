import { useState, useEffect } from 'react';
import { useInventory } from '../context/InventoryContext';
import QuickViewModal from '../components/QuickViewModal';
import SkeletonGrid from '../components/SkeletonGrid';

const API_BASE = 'http://localhost:5001';

export default function Favorites() {
  const { items, loading } = useInventory();
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

  const favoriteItems = items.filter(item => favoriteIds.includes(item.id));

  if (loading) return <SkeletonGrid />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50 py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">❤️ Улюблене</h1>
        {favoriteItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💔</div>
            <h3 className="text-2xl font-semibold text-gray-600">Ще немає улюблених</h3>
            <p className="text-gray-400 mt-2">Додайте предмети в галереї натисканням на ❤️</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {favoriteItems.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group"
              >
                <div className="relative h-56 bg-gray-100">
                  <img src={`${API_BASE}${item.photo}`} alt={item.inventory_name} className="w-full h-full object-cover" />
                  <button
                    onClick={(e) => removeFavorite(item.id, e)}
                    className="absolute top-3 right-3 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-2xl transition hover:scale-110 shadow-md"
                  >
                    ❤️
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 truncate">{item.inventory_name}</h3>
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
