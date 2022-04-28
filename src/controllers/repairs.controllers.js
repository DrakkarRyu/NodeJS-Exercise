const { Repair } = require('../models/repair.model');

const getAllRepairs = async (req, res) => {
  try {
    const repairs = await Repair.findAll({ where: { status: 'pending' } });

    res.status(200).json({
      repairs,
    });
  } catch (error) {
    console.log(error);
  }
};

const createRepair = async (req, res) => {
  try {
    const { date, userId } = req.body;
    const newRepair = await Repair.create({ date, userId });

    res.status(201).json({ newRepair });
  } catch (error) {
    console.log(error);
  }
};

const getRepairById = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repair.findOne({ where: { id } });

    res.status(200).json({
      repair,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.body;
    const repair = await Repair.findOne({ where: { id } });

    await repair.update({ status: 'completed' });

    res.status(200).json({ status: 'completed' });
  } catch (error) {
    console.log(error);
  }
};

const deleteRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repair.findOne({ where: { id } });

    await repair.update({ status: 'cancelled' });

    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllRepairs,
  createRepair,
  getRepairById,
  updateRepair,
  deleteRepair,
};
