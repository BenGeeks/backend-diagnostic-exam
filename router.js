const router = require('express').Router();

const userController = require('./controllers/userController');

router.post('/user/create', userController.authenticateUser, userController.createUser);
router.post('/user/login', userController.login);
router.get('/user/all', userController.authenticateUser, userController.getList);
router.delete('/user/:id', userController.authenticateUser, userController.deleteUser);
router.post('/user/update/:id', userController.authenticateUser, userController.updateUser);

module.exports = router;
