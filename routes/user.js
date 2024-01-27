const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

router.get('/:id', userController.showUser);
router.post('/', userController.userCreate);
router.post('/signIn', userController.signIn);






module.exports = router;