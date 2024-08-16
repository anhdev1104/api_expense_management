import Spendlimit from '../models/Spendlimit.js';

export const getSpenlimit = async (req, res) => {
  try {
    const data = await Spendlimit.find().populate('category');
    if (data.length < 0) {
      return res.status(404).json('Không tìm thấy hạn mức');
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getSpenlimitDetails = async (req, res) => {
  try {
    const data = await Spendlimit.find({ category: req.params.category }).populate('category');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addSpendlimit = async (req, res) => {
  try {
    const newData = { ...req.body, date: new Date(req.body.date) };
    const newSpendlimit = new Spendlimit(newData);
    await newSpendlimit.save();
    const populatedSpendlimit = await newSpendlimit.populate('category');
    return res.status(200).json(populatedSpendlimit);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateSpendlimit = async (req, res) => {
  try {
    const spendlimitUpdate = await Spendlimit.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json(spendlimitUpdate);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteSpendlimit = async (req, res) => {
  try {
    await Spendlimit.deleteMany({ category: req.params.category });
    return res.status(200).json('Xoá hạn mức danh mục thành công');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
