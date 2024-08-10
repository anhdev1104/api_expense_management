import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        'https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg',
    },
    role: {
      type: String,
      default: 'employee',
    },
  },
  { timestamps: true, versionKey: false }
);

const Accounts = mongoose.model('Accounts', accountSchema);

export default Accounts;
