const express = require('express');
const router = express.Router();
const code = require("../controller/code.controller");
const auth = require('../middleware/auth');

router.post("/code", auth, code.postCode);
router.get("/code", auth, code.getCode);

module.exports = router