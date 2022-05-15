//Importing Model
const { User } = require('../models/user.model');
const jwt = require('jsonwebtoken');

//importing utils

const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const protectToken = catchAsync(async (req, res, next) => {
  let token;
  //extract token from headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Baerer')
  ) {
    token = token.header.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('session expired', 403));
  }
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({
    where: { id: decoded.id, status: 'active' },
  });
  if (!user) {
    return next(new AppError('the owner pf this token is not avaible'));
  }
  req.sessionUser = user;
  next();
});

const protectEmployee = catchAsync(async (req, res, next) => {
  if (req.sessionUser.role !== 'employee') {
    return next(new AppError('Can not access', 407));
  }
  next();
});

//making the function
const userExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    return next(new AppError('User not found given that id', 404));
  }
  req.user = user;
  next();
});

const protectAccountOwner = catchAsync(async (req, res, next) => {
  // Get current session user and the user that is going to be updated
  const { sessionUser, user } = req;

  // Compare the id's
  if (sessionUser.id !== user.id) {
    // If the ids aren't equal, return error
    return next(new AppError('You do not own this account', 403));
  }

  // If the ids are equal, the request pass
  next();
});

module.exports = {
  userExists,
  protectToken,
  protectEmployee,
  protectAccountOwner,
};
