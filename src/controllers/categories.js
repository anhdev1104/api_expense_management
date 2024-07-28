import Category from '../models/Categories.js';

export const getCategories = async (req, res) => {
  try {
    const data = await Category.find();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    return res.status(200).json('Thêm danh mục thành công.');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
