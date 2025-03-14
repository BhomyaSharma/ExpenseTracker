const express = require('express');
const { register, login } = require('../controllers/authController'); // Ensure this path is correct

const router = express.Router();

router.post('/register', register);  // Ensure `register` is correctly imported
router.post('/login', login);

module.exports = router;
