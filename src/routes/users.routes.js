const express = require('express');
const { body } = require('express-validator');

//importing Middleware
const { userExists } = require('../middlewares/users.middlewares');
//importing validation middleware
const {
  createUserValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

//controllers
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/users.controllers');

const router = express.Router();

router.get('/', getAllUsers);

router.post('/', createUserValidations, checkValidations, createUser);

router
  .route('/:id')
  .get(userExists, getUserById)
  .patch(userExists, updateUser)
  .delete(userExists, deleteUser);

module.exports = { usersRouter: router };
