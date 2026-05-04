const API_BASE = 'http://localhost:5001';

export default function QuickViewModal({ item, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl animate-fadeIn" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <img
            src={item.photo ? `${API_BASE}${item.photo}` : '/placeholder.png'}
            alt={item.inventory_name}
            className="w-full h-80 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">{item.inventory_name}</h2>
          <p className="text-gray-600 leading-relaxed">{item.description || 'Опис відсутній'}</p>
        </div>
      </div>
    </div>
  );
}
