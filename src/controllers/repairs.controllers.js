//Importing Model
const { User } = require('../models/user.model');
const { Repair } = require('../models/repair.model');

//Importing utils
const { catchAsync } = require('../utils/catchAsync');

const getAllRepairs = catchAsync(async (req, res, next) => {
  const repairs = await Repair.findAll({
    where: { status: 'pending' },
    include: [{ model: User }],
  });

  res.status(200).json({
    repairs,
  });
});

const createRepair = catchAsync(async (req, res, next) => {
  const { date, computerNumber, comments, userId } = req.body;
  const newRepair = await Repair.create({
    date,
    computerNumber,
    comments,
    userId,
  });

  res.status(201).json({ newRepair });
});

const getRepairById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const repair = await Repair.findOne({ where: { id } });

  res.status(200).json({
    repair,
  });
});

const updateRepair = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { date } = req.body;
  const repair = await Repair.findOne({ where: { id } });

  await repair.update({ status: 'completed' });

  res.status(200).json({ status: 'completed' });
});

const deleteRepair = catchAsync(async (req, res) => {
  const { id } = req.params;
  const repair = await Repair.findOne({ where: { id } });

  await repair.update({ status: 'cancelled' });

  res.status(200).json({
    status: 'success',
  });
});

module.exports = {
  getAllRepairs,
  createRepair,
  getRepairById,
  updateRepair,
  deleteRepair,
};
