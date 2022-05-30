const express = require('express');
const { body } = require('express-validator');

// importing Middlewares
const { repairExists } = require('../middlewares/repairs.middlewares');
const {
  protectEmployee,
  protectToken,
  protectAccountOwner,
} = require('../middlewares/users.middlewares');

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

router.use(protectToken);
router.get('/completed', getCompletedRepairs);

router
  .route('/')
  .get(protectEmployee, getAllRepairs)
  .post(
    protectAccountOwner,
    createRepairValidations,
    checkValidations,
    createRepair
  );

router
  .use('/:id', repairExists)
  .route('/:id')
  .get(protectEmployee, getRepairById)
  .patch(protectEmployee, updateRepair)
  .delete(protectEmployee, deleteRepair);

module.exports = { repairRouter: router };
