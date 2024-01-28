const express = require("express");
const { requireAuth } = require('../middleware/auth');
const router = express.Router();



/**
 * PROTECTED AUTH
 */
router.get('/protected', requireAuth, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.user._id });
});


module.exports = router;