const { signup, login } = require('../Controller/AuthController');
const { sigupValidation } = require('../Middleware/AuthValidation');
const { loginValidation } = require('../Middleware/AuthValidation');

const router = require('express').Router();


router.post('/login', loginValidation, login);

router.post('/sigup', sigupValidation, signup);

module.exports = router;    