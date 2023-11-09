const express = require('express');
const router = express.Router();
const User = require("../controller/user.controller")
const auth = require("../middleware/auth")

router.post("/signup",User.register);
router.post("/login",User.login);

module.exports = router;