import { useInventory } from '../context/InventoryContext';
import InventoryTable from '../components/InventoryTable';
import CreateForm from '../components/CreateForm';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Admin() {
  const { loading, error } = useInventory();

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center 
mt-10">Помилка: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Адмін-панель інвентарю</h1>
      <CreateForm />
      <InventoryTable />
    </div>
  );
}
