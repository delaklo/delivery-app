import { Router, Request, Response } from 'express';
import Shop from '../models/Shop';
import Product from '../models/Product';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const shops = await Shop.find().lean();
    res.json(shops);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const shop = await Shop.findById(req.params.id).lean();
    if (!shop) return res.status(404).json({ message: 'Shop not found' });
    res.json(shop);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

router.get('/:id/products', async (req: Request, res: Response) => {
  try {
    const { page = '1', limit = '8', category, sort } = req.query;
    const pageNum = Math.max(1, parseInt(page as string) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit as string) || 8));
    const skip = (pageNum - 1) * limitNum;

    const filter: Record<string, unknown> = { shopId: req.params.id };
    if (category) filter.category = category;

    let sortObj: Record<string, 1 | -1> = {};
    if (sort === 'price_asc') sortObj = { price: 1 };
    else if (sort === 'price_desc') sortObj = { price: -1 };
    else if (sort === 'name_az') sortObj = { name: 1 };

    const [products, total] = await Promise.all([
      Product.find(filter).sort(sortObj).skip(skip).limit(limitNum).lean(),
      Product.countDocuments(filter),
    ]);

    res.json({
      products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
        hasNext: pageNum < Math.ceil(total / limitNum),
        hasPrev: pageNum > 1,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

export default router;
