import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { InventoryProvider } from './context/InventoryContext';
import Admin from './pages/Admin';
import Gallery from './pages/Gallery';
import Favorites from './pages/Favorites';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex gap-6">
        <Link to="/" className="hover:underline">Галерея</Link>
        <Link to="/admin" className="hover:underline">Адмін-панель</Link>
        <Link to="/favorites" className="hover:underline">Улюблені ❤️</Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <InventoryProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </InventoryProvider>
  );
}

export default App;