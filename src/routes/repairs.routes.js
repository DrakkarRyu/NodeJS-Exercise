const express = require('express');
const { body } = require('express-validator');

// importing Middlewares
const { repairExists } = require('../middlewares/repairs.middlewares');

//importing validation middleware
const {
  createRepairValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

// Controller
const {
  getAllRepairs,
  createRepair,
  getRepairById,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairs.controllers');

const router = express.Router();

router
  .route('/')
  .get(getAllRepairs)
  .post(createRepairValidations, checkValidations, createRepair);

router
  .use('/:id', repairExists)
  .route('/:id')
  .get(getRepairById)
  .patch(updateRepair)
  .delete(deleteRepair);

module.exports = { repairRouter: router };
