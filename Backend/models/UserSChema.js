import mongoose from 'mongoose';

const AdSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  sport_type: { type: String, required: true },
  experience: { type: Number, required: true },
  bio: { type: String },
  photo: { type: String },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  phoneNumber: { type: String, required: true },
  profileImage: { type: String },
  role: { type: String, enum: ['Coach', 'Client'], required: true },
  ads: [AdSchema],
  date: { type: Date, default: Date.now },
});

export default mongoose.model('User', UserSchema);
