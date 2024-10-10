import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    name: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    phoneNo: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
    total: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Completed', 'Pending', 'Shipped', 'Cancelled'],
        required: true,
    },
    items: Array,
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
