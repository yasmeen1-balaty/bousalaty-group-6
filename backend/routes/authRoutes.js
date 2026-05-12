const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Routes for Students
router.post('/register', authController.register);
router.post('/login', authController.login);

// Routes for Admin
router.post('/admin/login', authController.loginAdmin);
router.get('/admin/adminpanel',
    authController.verifyToken,
    authController.accessAdminPanel,
    (req, res) => {
        res.json({
            message: "Welcome Admin"
        });
    });

console.log("authRoutes loaded");
module.exports = router;

