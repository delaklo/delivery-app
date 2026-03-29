import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import Order from '../models/Order';
import { normalizePhone } from '../utils/phone';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, address, items, totalPrice, shopId, shopName } = req.body;
    if (!name || !email || !phone || !address || !items?.length || !shopId || !shopName)
      return res.status(400).json({ message: 'All fields are required' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({ message: 'Invalid email format' });
    if (!/^\+?[\d\s\-()]{10,15}$/.test(phone.trim()))
      return res.status(400).json({ message: 'Invalid phone number (min 10 digits)' });

    const order = new Order({
      name,
      email: email.toLowerCase().trim(),
      phone: normalizePhone(phone),
      address,
      items,
      totalPrice,
      shopId: String(shopId),
      shopName,
    });

    await order.save();
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

router.get('/search', async (req: Request, res: Response) => {
  try {
    const { email, phone, orderId } = req.query;

    if (orderId) {
      const id = (orderId as string).trim();
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ message: 'Invalid order ID format' });
      const order = await Order.findById(id).lean();
      if (!order) return res.status(404).json({ message: 'Order not found' });
      return res.json([order]);
    }

    if (!email || !phone)
      return res.status(400).json({ message: 'Provide email + phone, or order ID' });

    const emailStr = (email as string).toLowerCase().trim();
    const phoneStr = normalizePhone(phone as string);
    const orders = await Order.find({
      email: emailStr,
      phone: phoneStr,
    }).sort({ createdAt: -1 }).lean();

    if (orders.length === 0)
      return res.status(404).json({ message: 'No orders found for these credentials' });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

router.delete('/all', async (req: Request, res: Response) => {
  try {
    await Order.deleteMany({});
    res.json({ message: 'All orders deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

export default router;
