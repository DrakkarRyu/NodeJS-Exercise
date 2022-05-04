const { body, validationResult } = require('express-validator');

const createUserValidations = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
];

const createRepairValidations = [
  body('date')
    .notEmpty()
    .withMessage('Date can not be empty')
    .isDate()
    .withMessage('Must be a valid date'),
  body('computerNumber')
    .notEmpty()
    .withMessage('Computer Number or Serial Number can not be empty'),
  body('comments')
    .notEmpty()
    .withMessage('can not be empty')
    .isLength({ min: 10 })
    .withMessage('Comments must be at least 10 characters long'),
];

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);
    const errorMsg = messages.join('. ');

    return res.status(400).json({
      status: 'error',
      message: errorMsg,
    });
  }

  next();
};

module.exports = {
  createUserValidations,
  createRepairValidations,
  checkValidations,
};
