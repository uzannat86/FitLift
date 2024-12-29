import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const coachSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    sportType: { type: [String], required: true },
    experience: { type: Number, required: true },
    bio: { type: String },
    photo: { type: String },
    clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

const Coach = model('Coach', coachSchema);

export default Coach;
