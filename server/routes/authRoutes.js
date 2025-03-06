const express = require('express');
const { registerController, loginController, authVerifyController } = require('../controllers/authController');
const { authVerifyMiddleware } = require('../middlewares/authMiddleware');



const authRouter = express.Router()


authRouter.post('/register',registerController)

authRouter.post('/login',loginController)

authRouter.get('/tokenValidation',authVerifyMiddleware,authVerifyController)






module.exports = authRouter