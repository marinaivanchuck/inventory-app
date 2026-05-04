const API_BASE = 'http://localhost:5000';
export default function ViewModal({ item, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center 
justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-2xl w-full p-6" onClick={e 
=> e.stopPropagation()}>
        <img src={`${API_BASE}${item.photo}`} alt={item.inventory_name} 
className="w-full h-64 object-cover rounded mb-4" />
        <h2 className="text-2xl font-bold">{item.inventory_name}</h2>
        <p className="mt-2">{item.description}</p>
        <button onClick={onClose} className="mt-4 bg-gray-300 px-4 py-2 
rounded">Закрити</button>
      </div>
    </div>
  );
}
