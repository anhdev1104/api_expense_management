import mongoose from 'mongoose';

const spendlimitSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    moneylimit: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  },
  { timestamps: true, versionKey: false }
);

const Spendlimit = mongoose.model('Spendlimit', spendlimitSchema);
export default Spendlimit;
