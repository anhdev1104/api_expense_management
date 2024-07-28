import Transaction from '../models/Transactions.js';

export const getTransaction = async (req, res) => {
  try {
    const data = await Transaction.find();
    if (data.length < 0) {
      return res.status(404).json('Không tìm thấy giao dịch');
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addTransaction = async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    return res.status(200).json('Thêm giao dịch thành công.');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json('Cập nhập thành công !');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    return res.status(200).json('Xoá giao dịch thành công.');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};