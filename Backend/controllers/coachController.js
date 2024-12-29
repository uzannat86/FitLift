import User from '../models/UserSChema.js';
import Coach from '../models/Coach.js';
import Booking from '../models/Booking.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

// @desc    Create a new coach profile
// @route   POST /api/coaches
// @access  Private (Only for coaches)
export const createCoachProfile = asyncHandler(async (req, res, next) => {
  const { name, lastName, sportType, experience, bio, photo } = req.body;

  const coach = new Coach({
    name,
    lastName,
    sportType,
    experience,
    bio,
    photo,
    user: req.user.id, // Assuming req.user contains authenticated user info
  });

  await coach.save();
  res.status(201).json(coach);
});

export const createAd = asyncHandler(async (req, res, next) => {
  const { first_name, last_name, sport_type, experience, bio, price } =
    req.body;

  const user = await User.findById(req.user._id); // Use req.user._id here
  if (!user || user.role !== 'Coach') {
    return next(new ErrorResponse('Only coaches can create ads', 403));
  }

  const adData = {
    first_name,
    last_name,
    sport_type,
    experience,
    bio,
    price,
    photo: req.file ? req.file.path : null,
  };

  user.ads.push(adData);
  await user.save();

  res.status(201).json({ message: 'Ad created successfully', ad: adData });
});

// @desc    Update coach profile
// @route   PUT /api/coaches/:id
// @access  Private (Only for the specific coach)
export const updateCoachProfile = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const coach = await Coach.findById(id);

  if (!coach) {
    return next(new ErrorResponse('Coach not found', 404));
  }

  // Ensure the logged-in user is the owner of the coach profile
  if (coach.user.toString() !== req.user.id) {
    return next(new ErrorResponse('Unauthorized access', 403));
  }

  const updatedCoach = await Coach.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedCoach);
});

// @desc    Get all coach profiles
// @route   GET /api/coaches
// @access  Public
export const getAllCoaches = asyncHandler(async (req, res, next) => {
  const coaches = await Coach.find();
  res.status(200).json(coaches);
});

// @desc    Get a specific coach profile
// @route   GET /api/coaches/:id
// @access  Public
export const getCoachProfile = asyncHandler(async (req, res, next) => {
  const coach = await Coach.findById(req.params.id);

  if (!coach) {
    return next(new ErrorResponse('Coach not found', 404));
  }

  res.status(200).json(coach);
});

export const bookCoach = asyncHandler(async (req, res, next) => {
  const { message } = req.body;
  const coachId = req.params.coachId;
  const clientId = req.user._id;

  if (!message) {
    return next(new ErrorResponse('Message is required', 400));
  }

  try {
    const booking = await Booking.create({
      coach: coachId,
      client: clientId,
      message,
    });

    res.status(201).json({ message: 'Booking request created', booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    next(new ErrorResponse('Failed to create booking request', 500));
  }
});

export const getBookingRequests = asyncHandler(async (req, res, next) => {
  const coachId = req.user._id;

  try {
    const bookings = await Booking.find({ coach: coachId }).populate(
      'client',
      'name'
    );

    if (!bookings.length) {
      return res.status(200).json([]);
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching booking requests:', error);
    next(new ErrorResponse('Failed to fetch booking requests', 500));
  }
});

export const acceptClient = asyncHandler(async (req, res, next) => {
  const { clientId } = req.body;
  const coachId = req.user._id;

  try {
    const coach = await Coach.findOneAndUpdate(
      { user: coachId },
      { $addToSet: { clients: clientId } },
      { new: true }
    ).populate('clients', 'name');

    if (!coach) {
      return next(new ErrorResponse('Coach not found', 404));
    }

    await Booking.findOneAndDelete({ coach: coachId, client: clientId });

    res.status(200).json({
      message: 'Client accepted successfully',
      clients: coach.clients,
    });
  } catch (error) {
    console.error('Error accepting client:', error);
    next(new ErrorResponse('Failed to accept client', 500));
  }
});

export const getAcceptedClients = asyncHandler(async (req, res, next) => {
  const coachId = req.user._id;

  try {
    const coach = await Coach.findOne({ user: coachId }).populate(
      'clients',
      'name startedDate progress'
    );

    if (!coach) {
      console.log('Coach profile not found for user ID:', coachId);
      return next(new ErrorResponse('Coach profile not found', 404));
    }

    res.status(200).json(coach.clients);
  } catch (error) {
    console.error('Error fetching accepted clients:', error);
    next(new ErrorResponse('Failed to fetch accepted clients', 500));
  }
});
