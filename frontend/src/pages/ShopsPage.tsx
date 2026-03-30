import { useState, useEffect, useMemo, useCallback } from 'react';
import { api, Pagination } from '../api';
import { Shop, Product } from '../types';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const RATING_RANGES = [
  { label: '⭐ 4.0 – 5.0', min: 4, max: 5 },
  { label: '⭐ 3.0 – 4.0', min: 3, max: 4 },
  { label: '⭐ 2.0 – 3.0', min: 2, max: 3 },
  { label: '⭐ 1.0 – 2.0', min: 1, max: 2 },
];

const SORT_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'price_asc', label: 'Price ↑' },
  { value: 'price_desc', label: 'Price ↓' },
  { value: 'name_az', label: 'Name A→Z' },
];

const PAGE_LIMIT = 8;

export default function ShopsPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loadingShops, setLoadingShops] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [ratingFilter, setRatingFilter] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const { addItem, cart } = useCart();

  useEffect(() => {
    api.getShops()
      .then(data => { setShops(data); if (data.length) setSelectedShop(data[0]); })
      .catch(() => toast.error('Failed to load shops'))
      .finally(() => setLoadingShops(false));
  }, []);

  const loadProducts = useCallback(async (shopId: string, pg: number, cat: string, srt: string) => {
    setLoadingProducts(true);
    try {
      const res = await api.getProducts(shopId, { page: pg, limit: PAGE_LIMIT, category: cat || undefined, sort: srt || undefined });
      setProducts(res.products);
      setPagination(res.pagination);
    } catch {
      toast.error('Failed to load products');
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  useEffect(() => {
    if (!selectedShop) return;
    setActiveCategory('');
    setSort('');
    setPage(1);

    api.getProducts(selectedShop._id, { limit: 100 })
      .then(res => setAllCategories([...new Set(res.products.map(p => p.category))]))
      .catch(() => {});
    loadProducts(selectedShop._id, 1, '', '');
  }, [selectedShop, loadProducts]);

  
  useEffect(() => {
    if (!selectedShop) return;
    loadProducts(selectedShop._id, page, activeCategory, sort);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, activeCategory, sort]);

  const filteredShops = useMemo(() => {
    if (!ratingFilter) return shops;
    const range = RATING_RANGES.find(r => r.label === ratingFilter);
    return range ? shops.filter(s => s.rating >= range.min && s.rating <= range.max) : shops;
  }, [shops, ratingFilter]);

  const handleFilterChange = (cat: string) => { setActiveCategory(cat); setPage(1); };
  const handleSortChange = (srt: string) => { setSort(srt); setPage(1); };

  const handleAdd = (product: Product) => {
    if (!selectedShop) return;
    if (cart.shopId && cart.shopId !== selectedShop._id) {
      toast(t => (
        <span>
          Cart has items from <b>{cart.shopName}</b>. Replace?{' '}
          <button onClick={() => { addItem(product, selectedShop._id, selectedShop.name); toast.dismiss(t.id); flash(product._id); }}
            style={{ marginLeft: 8, background: '#ff5c28', color: '#fff', border: 'none', borderRadius: 6, padding: '2px 10px', cursor: 'pointer', fontWeight: 600 }}>Yes</button>
        </span>
      ), { duration: 4000 });
      return;
    }
    addItem(product, selectedShop._id, selectedShop.name);
    flash(product._id);
    toast.success(`${product.name} added`, { duration: 1200 });
  };

  const flash = (id: string) => {
    setAddedIds(p => new Set(p).add(id));
    setTimeout(() => setAddedIds(p => { const n = new Set(p); n.delete(id); return n; }), 900);
  };

  const renderPagination = () => {
    if (!pagination || pagination.totalPages <= 1) return null;
    const { page: cur, totalPages } = pagination;
    const pages: (number | '...')[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (cur > 3) pages.push('...');
      for (let i = Math.max(2, cur - 1); i <= Math.min(totalPages - 1, cur + 1); i++) pages.push(i);
      if (cur < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return (
      <div className="pagination">
        <button className="pg-btn" disabled={!pagination.hasPrev} onClick={() => setPage(p => p - 1)}>← Prev</button>
        {pages.map((p, i) =>
          p === '...'
            ? <span key={`e${i}`} className="pg-info">…</span>
            : <button key={p} className={`pg-btn ${p === cur ? 'active' : ''}`} onClick={() => setPage(p as number)}>{p}</button>
        )}
        <button className="pg-btn" disabled={!pagination.hasNext} onClick={() => setPage(p => p + 1)}>Next →</button>
      </div>
    );
  };

  return (
    <div className="page">
      <h1 className="page-title">Order Food</h1>
      <p className="page-sub">Choose a restaurant and add items to your cart</p>

      {loadingShops ? (
        <div className="loading"><div className="spinner" />Loading...</div>
      ) : (
        <div className="shops-layout">
          <aside className="sidebar">
            <p className="sidebar-label">Restaurants</p>
            {filteredShops.map(shop => (
              <button key={shop._id} className={`shop-btn ${selectedShop?._id === shop._id ? 'active' : ''}`} onClick={() => setSelectedShop(shop)}>
                {shop.name}
                <span className="shop-meta">{shop.category} · ★ {shop.rating}</span>
              </button>
            ))}
            {filteredShops.length === 0 && <p style={{ fontSize: '.8rem', color: 'var(--muted)', padding: '.5rem .75rem' }}>No shops in range</p>}

            <p className="sidebar-label">Filter by Rating</p>
            <button className={`rating-filter-btn ${ratingFilter === '' ? 'active' : ''}`} onClick={() => setRatingFilter('')}>All ratings</button>
            {RATING_RANGES.map(r => (
              <button key={r.label} className={`rating-filter-btn ${ratingFilter === r.label ? 'active' : ''}`}
                onClick={() => setRatingFilter(ratingFilter === r.label ? '' : r.label)}>{r.label}</button>
            ))}
          </aside>

          <div className="products-area">
            <div className="filters-bar">
              <button className={`filter-chip ${activeCategory === '' ? 'active' : ''}`} onClick={() => handleFilterChange('')}>All</button>
              {allCategories.map(cat => (
                <button key={cat} className={`filter-chip ${activeCategory === cat ? 'active' : ''}`} onClick={() => handleFilterChange(cat)}>{cat}</button>
              ))}
              <select className="sort-select" value={sort} onChange={e => handleSortChange(e.target.value)}>
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {loadingProducts ? (
              <div className="loading"><div className="spinner" />Loading menu...</div>
            ) : products.length === 0 ? (
              <div className="empty"><div className="empty-icon">🍽️</div><h3>No items found</h3></div>
            ) : (
              <>
                {pagination && (
                  <p style={{ fontSize: '.8rem', color: 'var(--muted)', marginBottom: '.75rem' }}>
                    {pagination.total} product{pagination.total !== 1 ? 's' : ''} · page {pagination.page} of {pagination.totalPages}
                  </p>
                )}
                <div className="products-grid">
                  {products.map(p => (
                    <div key={p._id} className="product-card">
                      <img src={p.imageUrl} alt={p.name} className="product-img"
                        onError={e => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x150/1e1e1e/555?text=Food'; }} />
                      <div className="product-body">
                        <h3 className="product-name">{p.name}</h3>
                        <p className="product-desc">📂 {p.category}</p>
                        <div className="product-footer">
                          <span className="product-price">₴{p.price}</span>
                          <button className="add-btn" onClick={() => handleAdd(p)}>
                            {addedIds.has(p._id) ? '✓ Added' : '+ Add'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {renderPagination()}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
