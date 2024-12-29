import mongoose from 'mongoose';

const TrainingPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  days: { type: Number, required: true },
  exercises: [
    {
      day: { type: Number, required: true },
      exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise',
        required: true,
      },
      sets: { type: Number },
      reps: { type: Number },
      weight: { type: String }, // Optional
      RPE: { type: Number }, // Optional
      notes: { type: String }, // Optional
    },
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.model('TrainingPlan', TrainingPlanSchema);
