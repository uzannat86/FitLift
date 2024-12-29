import User from '../models/UserSChema.js';

const roleMiddleware = (roles) => async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('role');
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ msg: 'Access denied' });
    }
    next();
  } catch (error) {
    console.error('Error fetching user role:', error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

export default roleMiddleware;
