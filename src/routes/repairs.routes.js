const express = require('express');

// Middlewares
const { repairExists } = require('../middlewares/repairs.middlewares');

// Controller
const {
  getAllRepairs,
  createRepair,
  getRepairById,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairs.controllers');

const router = express.Router();

router.route('/').get(getAllRepairs).post(createRepair);

router
  .use('/:id', repairExists)
  .route('/:id')
  .get(getRepairById)
  .patch(updateRepair)
  .delete(deleteRepair);

module.exports = { repairRouter: router };
