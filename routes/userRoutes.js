const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controller/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Routes
router.get('/profile', protect, getUserProfile ); // GET user profile
router.put('/profile', protect, updateUserProfile); // Update user profile

module.exports = router;
