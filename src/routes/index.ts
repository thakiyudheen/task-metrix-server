import { Router } from 'express';
import { jwtMiddleware } from '../utils/jwtMiddleware/jwtMiddleWare';
import { getUserController } from '../controller/auth/getUser';
import { loginController } from '../controller/auth/loginUser';
import { signupController } from '../controller/auth/signupUser';
import { createTaskController } from '../controller/task/createTasks';
import { deleteTaskController } from '../controller/task/deleteTask';
import { getTaskController } from '../controller/task/getTasks';
import { updateController } from '../controller/task/updateTask';
import { logoutController } from '../controller/auth/logout';
import { isUserExistController } from '../controller/auth/isUserExist';
import { googleSignupController } from '../controller/auth/googleSignup';
import { googleAuthController } from '../controller/auth/googleAuth';

const router = Router()


// isExistUser ------------------------------
router.route('/isExistUser/:email').get(isUserExistController)

// google signup-----------------------------
router.route('/googleSignup').post(googleSignupController)

// google signup-----------------------------
router.route('/googleAuth').post(googleAuthController)

// signup a user-----------------------------
router.route('/signup').post(signupController)

// login a user------------------------------
router.route('/login').post(loginController)

// get  user------------------------------
router.route('/getUser').get(jwtMiddleware,getUserController)

//create task------------------------------
router.route('/createTask').post(jwtMiddleware,createTaskController)

//create task------------------------------
router.route('/deleteTask').delete(deleteTaskController)

//create task------------------------------
router.route('/getTasks').get(jwtMiddleware,getTaskController)

//update task------------------------------
router.route('/updateTask').put(updateController)

// logout user ------------------------------
router.route('/logout').delete(logoutController)


export default router;