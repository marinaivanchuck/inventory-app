export default function ConfirmDelete({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center 
justify-center">
      <div className="bg-white p-6 rounded-lg">
        <p>Ви впевнені, що хочете видалити цю позицію?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 
rounded">Скасувати</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 
text-white rounded">Видалити</button>
        </div>
      </div>
    </div>
  );
}
