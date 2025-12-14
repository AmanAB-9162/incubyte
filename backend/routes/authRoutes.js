const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


//User routes
router.post('/register', authController.register);
router.post('/login', authController.login);


// Admin routes
router.post('/admin/register', authController.registerAdmin);
router.post('/admin/login', authController.loginAdmin);



module.exports = router;