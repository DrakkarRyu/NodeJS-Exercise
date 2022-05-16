const express = require('express');
const { body } = require('express-validator');

//importing Middleware
const {
  userExists,
  protectToken,
  protectAccountOwner,
} = require('../middlewares/users.middlewares');

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
  login,
  checkToken,
} = require('../controllers/users.controllers');

const router = express.Router();
router.use(protectToken);

router.get('/', getAllUsers);

router.post('/', createUserValidations, checkValidations, createUser);
router.post('/login', login);
router.get('/check-token', checkToken);

router
  .route('/:id')
  .get(userExists, getUserById)
  .patch(userExists, protectAccountOwner, updateUser)
  .delete(userExists, protectAccountOwner, deleteUser);

module.exports = { usersRouter: router };
