import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
  },
  issueDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  // dueDate: {
  //   type: Date,
  //   required: true,
  // },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  }],
  
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ["paid", "unpaid", "pending"],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true,
    default: ""
  },

},
  { timestamps: true },
);

export default mongoose.model("Invoice", invoiceSchema);
