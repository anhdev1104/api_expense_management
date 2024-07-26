import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['expense', 'income'],
      required: true,
    },
    date: String,
    description: String,
    money: {
      type: Number,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
