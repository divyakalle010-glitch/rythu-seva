const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

const farmerRegistrationRules = () => [
  body('name').notEmpty().withMessage('Name is required'),
  body('mobile').isLength({ min: 10, max: 10 }).withMessage('Mobile must be 10 digits'),
  body('state_id').notEmpty().withMessage('State is required'),
  body('district_id').notEmpty().withMessage('District is required'),
  body('village_id').notEmpty().withMessage('Village is required'),
  body('language').isIn(['en', 'te', 'hi']).withMessage('Invalid language')
];

const adminLoginRules = () => [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
];

const bookingRules = () => [
  body('crop_id').notEmpty().withMessage('Crop is required'),
  body('centre_id').notEmpty().withMessage('Centre is required'),
  body('declared_quantity').isNumeric().withMessage('Quantity must be numeric'),
  body('land_area').isNumeric().withMessage('Land area must be numeric'),
  body('harvest_date').isISO8601().withMessage('Invalid harvest date'),
  body('slot_date').isISO8601().withMessage('Invalid slot date')
];

module.exports = {
  validate,
  farmerRegistrationRules,
  adminLoginRules,
  bookingRules
};
