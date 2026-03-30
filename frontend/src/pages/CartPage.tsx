import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { api } from '../api';
import { OrderFormData } from '../types';
import toast from 'react-hot-toast';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

function validate(data: OrderFormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim() || data.name.trim().length < 2)
    errors.name = 'Name must be at least 2 characters';
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = 'Enter a valid email address';
  if (!data.phone.trim() || !/^\+?[\d\s\-()]{10,15}$/.test(data.phone))
    errors.phone = 'Enter a valid phone number (min 10 digits)';
  if (!data.address.trim() || data.address.trim().length < 5)
    errors.address = 'Address must be at least 5 characters';
  return errors;
}

export default function CartPage() {
  const { cart, removeItem, updateQuantity, clearCart, totalPrice, totalItems } = useCart();
  const [form, setForm] = useState<OrderFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    if (cart.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.createOrder({
        ...form,
        items: cart.items.map((i) => ({
          productId: i.product._id,
          name: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
          imageUrl: i.product.imageUrl,
        })),
        totalPrice,
        shopId: cart.shopId!,
        shopName: cart.shopName!,
      });
      setOrderId(res.order._id);
      setSuccess(true);
      clearCart();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to place order');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="page">
        <div className="success-overlay">
          <div className="success-icon">✓</div>
          <h2>Order Placed!</h2>
          <p className="success-order-id">Order ID: <strong>{orderId}</strong></p>
          <p className="success-message">
            Your order has been received. We'll deliver it as soon as possible.
          </p>
          <Link to="/" className="go-shop-btn">
            Order More Food
          </Link>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="page">
        <h1 className="page-title">Shopping Cart</h1>
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some delicious items from our restaurants</p>
          <Link to="/" className="go-shop-btn">
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">Shopping Cart</h1>
      <p className="page-subtitle">
        {totalItems} item{totalItems !== 1 ? 's' : ''} from{' '}
        <span style={{ color: 'var(--accent)' }}>{cart.shopName}</span>
      </p>

      <div className="cart-layout">
        {/* Cart Items */}
        <div>
          <div className="cart-items-section">
            <div className="cart-section-title">
              Your Items
              <span className="cart-shop-tag">{cart.shopName}</span>
            </div>
            {cart.items.map(({ product, quantity }) => (
              <div key={product._id} className="cart-item">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="cart-item-img"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400';
                  }}
                />
                <div>
                  <div className="cart-item-name">{product.name}</div>
                  <div className="cart-item-price">₴{product.price} each</div>
                </div>
                <div className="cart-item-controls">
                  <div className="cart-item-total">₴{product.price * quantity}</div>
                  <div className="qty-control">
                    <button
                      className="qty-btn remove"
                      onClick={() => {
                        if (quantity === 1) removeItem(product._id);
                        else updateQuantity(product._id, quantity - 1);
                      }}
                      title={quantity === 1 ? 'Remove' : 'Decrease'}
                    >
                      {quantity === 1 ? '×' : '−'}
                    </button>
                    <span className="qty-val">{quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(product._id, quantity + 1)}
                      title="Increase"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Form */}
        <div className="order-form-section">
          <div className="cart-section-title">Delivery Details</div>
          <form className="order-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className={`form-input ${errors.phone ? 'error' : ''}`}
                placeholder="+380 50 123 4567"
                value={form.phone}
                onChange={handleChange}
              />
              {errors.phone && <p className="form-error">{errors.phone}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="address">
                Delivery Address
              </label>
              <input
                id="address"
                name="address"
                className={`form-input ${errors.address ? 'error' : ''}`}
                placeholder="Khreshchatyk St 1, Kyiv"
                value={form.address}
                onChange={handleChange}
              />
              {errors.address && <p className="form-error">{errors.address}</p>}
            </div>

            <div className="order-summary">
              <div className="summary-row">
                <span>Subtotal ({totalItems} items)</span>
                <span>₴{totalPrice}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span style={{ color: 'var(--green)' }}>Free</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span className="total-accent">₴{totalPrice}</span>
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? 'Placing Order...' : 'Place Order →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
