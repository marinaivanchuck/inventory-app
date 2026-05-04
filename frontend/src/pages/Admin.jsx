import { useInventory } from '../context/InventoryContext';
import InventoryTable from '../components/InventoryTable';
import CreateForm from '../components/CreateForm';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Admin() {
  const { loading, error, refetch } = useInventory();

  if (loading) return <LoadingSpinner />;
  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-red-500 text-xl mb-4">Помилка: {error}</div>
      <button onClick={refetch} className="bg-indigo-600 text-white px-6 py-2 rounded-lg">Повторити</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">🔧 Адмін-панель інвентарю</h1>
          <CreateForm />
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-6 overflow-hidden">
          <InventoryTable />
        </div>
      </div>
    </div>
  );
}
