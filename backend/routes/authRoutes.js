const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Routes for Students
router.post('/register', authController.register);
router.post('/login', authController.login);

// Routes for Admin
router.post('/admin/login', authController.loginAdmin);
router.get('/admin/dashboard', authController.verifyToken, authController.accessAdminPanel);

console.log("authRoutes loaded");
module.exports = router;

