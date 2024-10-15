import Order from '../model/order.model.js';
import Invoice from '../model/invoice.model.js';
import User from '../model/user.model.js';
// Get all orders
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new order
export const createOrder = async (req, res) => {
    const { id } = req.params; // User ID from params
    const { name, email, address, phoneNo,  } = req.body.customerDetails
    try {
        // 1. Create a new Order
        const newOrder = new Order({
            name:name,
            email:email,
            items:req.body.items,
            total:req.body.total
        });
        await newOrder.save();

        // 2. Create an Invoice for the new Order
        const newInvoice = new Invoice({
            invoiceNumber: generateInvoiceNumber(), // You might want to implement a function to generate this
            issueDate: Date.now(),
            customer: id, // Referencing the user ID
            items: req.body.items, // Assuming you have items in the request body
            // quantities: req.body.quantities, // Assuming quantities are sent in the request body
            // subtotal: req.body.subtotal, // Assuming subtotal is calculated beforehand
            total: req.body.total, // Assuming total is calculated
            paymentStatus: req.body.paymentStatus || "pending", // Default to "pending"
            notes: req.body.notes || "", // Optional notes
        });
        await newInvoice.save();

        // 3. Update the user by pushing the new order to the user's "Orders" array
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $push: { Orders: newOrder } }, // Add the new order to the Orders array
            { new: true } // Return the updated user document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // 4. Respond with the new order and invoice
        res.status(201).json({ order: newOrder, invoice: newInvoice });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Helper function to generate a unique invoice number
const generateInvoiceNumber = () => {
    return `INV-${Date.now()}`;
};

// Update an existing order
export const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an order
export const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
        res.status(200).json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
