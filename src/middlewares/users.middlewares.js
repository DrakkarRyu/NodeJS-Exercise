//Importing Model
const { User } = require('../models/user.model');

//importing utils

const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

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
module.exports = { userExists };
