
import express from 'express';
import {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
} from '../controller/order.controller.js';

const router = express.Router();

router.get('/', getOrders);
router.get('/:id', getOrderById);
router.post('/:id', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;
