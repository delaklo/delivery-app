import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ShopsPage from './pages/ShopsPage';
import CartPage from './pages/CartPage';
import HistoryPage from './pages/HistoryPage';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<ShopsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
        <Toaster position="bottom-right" toastOptions={{
          style: { background: '#1e1e1e', color: '#f0ede8', border: '1px solid #2a2a2a', borderRadius: '10px', fontFamily: "'DM Sans', sans-serif", fontSize: '.875rem' }
        }} />
      </CartProvider>
    </BrowserRouter>
  );
}
