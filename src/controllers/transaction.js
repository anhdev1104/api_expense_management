import Spendlimit from '../models/Spendlimit.js';
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

export const getTransactionDetails = async (req, res) => {
  const { month, year } = req.query;

  if (!month || !year) {
    return res.status(400).json('Tháng và năm là bắt buộc!');
  }

  // Khởi tạo startDate và endDate dựa trên tháng và năm
  const startDate = new Date(Date.UTC(year, month - 1, 1)); // Tháng trong JavaScript bắt đầu từ 0
  const endDate = new Date(Date.UTC(year, month, 1)); // Tháng tới

  try {
    const data = await Transaction.find({
      category: req.params.category,
      date: { $gte: startDate, $lt: endDate },
    }).populate('category');

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getTransactionByType = async (req, res) => {
  try {
    const data = await Transaction.find({ type: req.params.type });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getTransactionByDate = async (req, res) => {
  const { month, year } = req.query;
  if (!month || !year) {
    return res.status(400).json('Tháng và năm bắt buộc có !');
  }
  const startDate = new Date(`${year}-${month}-01T00:00:00Z`);
  const endDate = new Date(`${year}-${month}-01T00:00:00Z`);
  endDate.setMonth(endDate.getMonth() + 1); // set lại giá trị tháng hiện tại + lên 1 tháng => giá trị bằng ngày đầu tiên của tháng tới
  try {
    const data = await Transaction.find({ date: { $gte: startDate, $lt: endDate } }).populate('category');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addTransaction = async (req, res) => {
  try {
    const { date, category, money } = req.body;
    const inputDate = new Date(date);
    const year = inputDate.getUTCFullYear();
    const month = inputDate.getUTCMonth();

    const filterDateOfCategory = {
      category,
      date: {
        $gte: new Date(Date.UTC(year, month, 1)), // Ngày đầu tiên của tháng
        $lt: new Date(Date.UTC(year, month + 1, 1)), // Ngày đầu tiên của tháng tiếp theo
      },
    };

    const data = await Spendlimit.find(filterDateOfCategory);
    const dataTransaction = await Transaction.find(filterDateOfCategory);
    const totalExpense = dataTransaction.reduce((acc, curr) => acc + curr.money, 0);

    if (totalExpense > data[0]?.moneylimit || money > data[0]?.moneylimit) {
      return res.status(400).json({ message: 'Số tiền chi tiêu vượt quá hạn mức của danh mục trong tháng !' });
    }

    const newData = { ...req.body, date: inputDate };
    const newTransaction = new Transaction(newData);
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
