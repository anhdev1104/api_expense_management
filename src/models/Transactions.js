import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['expense', 'income'],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: String,
    money: {
      type: Number,
      require: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  },
  { timestamps: true, versionKey: false }
);

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
