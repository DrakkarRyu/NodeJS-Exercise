//importing the model
const { Repair } = require('../models/repair.model');

//importing utils

const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

//making the function

const repairExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({ where: { id } });

  if (!repair) {
    return next(new AppError('Not exist a pending repair', 404));
  }
  req.repair = repair;
  next();
});

module.exports = { repairExists };
