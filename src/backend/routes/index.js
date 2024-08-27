const express = require('express');
const router = express.Router();
const AuthMiddleware = require("../middlewares/authMiddleware");

router.get('/', AuthMiddleware.authenticateToken,(req, res) => {
    res.send('Hello from Backend!');
});

module.exports = router;
