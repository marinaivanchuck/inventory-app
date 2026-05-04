const API_BASE = 'http://localhost:5000';

export default function QuickViewModal({ item, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center 
justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] 
overflow-auto" onClick={e => e.stopPropagation()}>
        <div className="relative">
          <img src={`${API_BASE}${item.photo}`} alt={item.inventory_name} 
className="w-full h-64 object-cover rounded-t-xl" />
          <button onClick={onClose} className="absolute top-2 right-2 
bg-white rounded-full p-1 text-xl">✕</button>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold 
mb-2">{item.inventory_name}</h2>
          <p className="text-gray-700">{item.description || 'Опис 
відсутній'}</p>
        </div>
      </div>
    </div>
  );
}
