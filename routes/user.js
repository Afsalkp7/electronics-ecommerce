const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

/**
 * USER PROFILE SHOW
 */
router.get('/:id', userController.showUser);

/**
 * USER REGISTRATION AND LOGIN
 */
router.post('/', userController.userCreate);
router.post('/signIn', userController.signIn);

/**
 * USER DATA UPDATE
 */
router.put('/', userController.userUpdate);

/**
 * USER LOGOUT
 */
router.get('/logout', userController.userLogout)

/**
 * USER PASSWORD CHANGE
 */
router.put('/changePassword', userController.passchange)

module.exports = router;