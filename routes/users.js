const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');
router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
router.get('/getallusers', userController.allusers)
router.put('/:userId', userController.updatePasswordUser)
router.put('/role/:userId', userController.updateRoledUser)
module.exports = router;