import mongoose from 'mongoose';

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      enum: ['expense', 'income'],
      require: true,
    },
    icon: String,
  },
  { timestamps: true, versionKey: false }
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
