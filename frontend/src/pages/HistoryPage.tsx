import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { Order } from '../types';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

type Tab = 'credentials' | 'id';
interface Errors { email?: string; phone?: string; orderId?: string; }

function validate(tab: Tab, form: { email: string; phone: string; orderId: string }): Errors {
  const e: Errors = {};
  if (tab === 'credentials') {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.phone.trim()) e.phone = 'Phone is required';
  } else {
    if (!form.orderId.trim()) e.orderId = 'Order ID is required';
  }
  return e;
}

export default function HistoryPage() {
  const [tab, setTab] = useState<Tab>('credentials');
  const [form, setForm] = useState({ email: '', phone: '', orderId: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const { setItem, cart } = useCart();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setErrors(p => ({ ...p, [e.target.name]: undefined }));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(tab, form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true); setOrders(null); setNotFound(false);
    try {
      const params = tab === 'credentials'
        ? { email: form.email.trim(), phone: form.phone.trim() }
        : { orderId: form.orderId.trim() };
      setOrders(await api.searchOrders(params));
    } catch (err) {
      setNotFound(true);
      if (err instanceof Error) toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = (order: Order) => {
    const cartShopName = cart.shopName;
    const orderShopName = order.shopName;
    const hasItems = cart.items.length > 0;
    const sameShop = cartShopName === orderShopName;
    const differentShopWithItems = hasItems && !sameShop && cartShopName !== null;

    if (differentShopWithItems) {
      toast(t => (
        <span>
          Cart has items from <b>{cart.shopName}</b>. Replace?{' '}
          <button onClick={() => { doReorder(order); toast.dismiss(t.id); }}
            style={{ marginLeft: 8, background: '#ff5c28', color: '#fff', border: 'none', borderRadius: 6, padding: '2px 10px', cursor: 'pointer', fontWeight: 600 }}>
            Yes
          </button>
        </span>
      ), { duration: 5000 });
      return;
    }
    doReorder(order);
  };

  const doReorder = (order: Order) => {
    order.items.forEach(item => {
      const product = {
        _id: item.productId,
        shopId: order.shopId,
        name: item.name,
        description: '',
        price: item.price,
        imageUrl: item.imageUrl,
        category: '',
      };
      setItem(product, order.shopId, order.shopName, item.quantity);
    });
    toast.success(`${order.items.length} item${order.items.length !== 1 ? 's' : ''} added to cart`);
    navigate('/cart');
  };

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="page">
      <h1 className="page-title">Order History</h1>
      <p className="page-sub">Find your past orders by email + phone or order ID</p>

      <div className="history-search">
        <div className="search-tabs">
          <button className={`tab-btn ${tab === 'credentials' ? 'active' : ''}`}
            onClick={() => { setTab('credentials'); setOrders(null); setNotFound(false); }}>Email + Phone</button>
          <button className={`tab-btn ${tab === 'id' ? 'active' : ''}`}
            onClick={() => { setTab('id'); setOrders(null); setNotFound(false); }}>Order ID</button>
        </div>

        <div className="card">
          <form className="form-body" onSubmit={handleSearch} noValidate>
            {tab === 'credentials' ? (
              <>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input name="email" className={`form-input ${errors.email ? 'err' : ''}`}
                    placeholder="john@example.com" value={form.email} onChange={handleChange} />
                  {errors.email && <p className="form-err">{errors.email}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input name="phone" className={`form-input ${errors.phone ? 'err' : ''}`}
                    placeholder="+380501234567" value={form.phone} onChange={handleChange} />
                  {errors.phone && <p className="form-err">{errors.phone}</p>}
                  <p style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: '.25rem' }}>
                    Enter exactly as you used when ordering
                  </p>
                </div>
              </>
            ) : (
              <div className="form-group">
                <label className="form-label">Order ID</label>
                <input name="orderId" className={`form-input ${errors.orderId ? 'err' : ''}`}
                  placeholder="664abc123..." value={form.orderId} onChange={handleChange} />
                {errors.orderId && <p className="form-err">{errors.orderId}</p>}
              </div>
            )}
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Searching...' : 'Search Orders'}
            </button>
          </form>
        </div>
      </div>

      {notFound && (
        <div className="empty">
          <div className="empty-icon">📭</div>
          <h3>No orders found</h3>
          <p>Check your details and try again</p>
        </div>
      )}

      {orders && orders.length > 0 && (
        <div>
          <p className="page-sub" style={{ marginBottom: '1rem' }}>
            Found {orders.length} order{orders.length !== 1 ? 's' : ''}
          </p>
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-card-header">
                <div>
                  <div className="order-shop">{order.shopName}</div>
                  <div className="order-id">#{order._id}</div>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '.4rem' }}>
                  <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
                    <span className="order-date">{fmt(order.createdAt)}</span>
                    <span className="order-total">₴{order.totalPrice}</span>
                  </div>
                  <button className="reorder-btn" onClick={() => handleReorder(order)}>
                    🔄 Reorder
                  </button>
                </div>
              </div>
              <div className="order-items">
                {order.items.map((item, i) => (
                  <div key={i} className="order-item-row">
                    <span className="order-item-name">{item.name}</span>
                    <span className="order-item-qty">×{item.quantity} · ₴{item.price * item.quantity}</span>
                  </div>
                ))}
                <div style={{ fontSize: '.8rem', color: 'var(--muted)', marginTop: '.25rem' }}>📍 {order.address}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
