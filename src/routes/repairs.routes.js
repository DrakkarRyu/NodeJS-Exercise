const express = require('express');
const { body } = require('express-validator');

// importing Middlewares
const { repairExists } = require('../middlewares/repairs.middlewares');
const { protectEmployee } = require('../middlewares/users.middlewares');

//importing validation middleware
const {
  createRepairValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

// Controller
const {
  getAllRepairs,
  getCompletedRepairs,
  createRepair,
  getRepairById,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairs.controllers');

const router = express.Router();

router.get('/completed', getCompletedRepairs);

router
  .route('/')
  .get(getAllRepairs, protectEmployee)
  .post(createRepairValidations, checkValidations, createRepair);

router
  .use('/:id', repairExists)
  .route('/:id')
  .get(getRepairById, protectEmployee)
  .patch(updateRepair, protectEmployee)
  .delete(deleteRepair, protectEmployee);

module.exports = { repairRouter: router };
