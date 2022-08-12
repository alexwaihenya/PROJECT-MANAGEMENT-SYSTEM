import { Router } from "express";
import { checkUser, getHomepage, login, register } from "../Contollers/usersController";
import { VerifyToken } from "../Middleware/VerifyToken";


const router1 = Router();
router1.post('/registeruser',register)
router1.post('/login',login)

router1.get('/homepage',VerifyToken,getHomepage)
router1.get('/check',VerifyToken,checkUser)


export default router1;