const express = require('express');
const { createBookmark, getBookmarks, deleteBookmark } = require('../controller/bookmarkController');
const { protect } = require('../middleware/authMiddleware');


const router = express.Router();

// Route to create a new bookmark
router.post('/', protect, createBookmark);

// Route to get all bookmarks for the authenticated user
router.get('/', protect, getBookmarks);

// Route to delete a bookmar
router.delete('/:id', protect, deleteBookmark);

module.exports = router;
