import TrainingPlan from '../models/TrainingPlan.js';
import User from '../models/UserSChema.js';

export async function createTrainingPlan(req, res) {
  const { name, days, exercises, clientId } = req.body;

  const client = await User.findById(clientId);
  if (!client || client.role !== 'Client') {
    return res.status(404).json({ error: 'Client not found' });
  }

  try {
    const newTrainingPlan = new TrainingPlan({
      name,
      days,
      exercises,
      createdBy: req.user.id,
      clientId: clientId,
    });

    await newTrainingPlan.save();
    res.status(201).json(newTrainingPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getClientTrainingPlans(req, res) {
  try {
    const clientId = req.user._id;

    const trainingPlans = await TrainingPlan.find({ clientId }).populate(
      'exercises.exercise'
    );

    res.json(trainingPlans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getTrainingPlanById(req, res) {
  try {
    const trainingPlan = await TrainingPlan.findById(req.params.id).populate(
      'exercises.exercise'
    );
    if (!trainingPlan) {
      return res.status(404).json({ msg: 'Training plan not found' });
    }
    res.json(trainingPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateTrainingPlan(req, res) {
  const { name, days, exercises } = req.body;

  try {
    const trainingPlan = await TrainingPlan.findById(req.params.id);
    if (!trainingPlan) {
      return res.status(404).json({ msg: 'Training plan not found' });
    }

    if (trainingPlan.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ msg: 'You are not authorized to update this plan' });
    }

    trainingPlan.name = name || trainingPlan.name;
    trainingPlan.days = days || trainingPlan.days;
    trainingPlan.exercises = exercises || trainingPlan.exercises;

    await trainingPlan.save();
    res.json(trainingPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteTrainingPlan(req, res) {
  try {
    const trainingPlan = await TrainingPlan.findById(req.params.id);
    if (!trainingPlan) {
      return res.status(404).json({ msg: 'Training plan not found' });
    }

    if (trainingPlan.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ msg: 'You are not authorized to delete this plan' });
    }

    await trainingPlan.remove();
    res.json({ msg: 'Training plan removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
