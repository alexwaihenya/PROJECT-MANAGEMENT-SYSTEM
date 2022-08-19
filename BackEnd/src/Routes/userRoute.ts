import { Router } from "express";
import { getAllProjects } from "../Contollers/projectController";
import { checkAssigned, checkUser, getAllUsers, getHomepage, login, pendingUsers, register, updateComplete } from "../Contollers/usersController";
import { VerifyToken } from "../Middleware/VerifyToken";


const router1 = Router();
router1.post('/registeruser',register)
router1.post('/login',login)
router1.post('/markdone',updateComplete)
router1.post('/assigned', checkAssigned)
router1.post("/getallusers",getAllUsers)
router1.post('/nullusers', pendingUsers)

router1.get('/homepage',VerifyToken,getHomepage)
router1.get('/check',VerifyToken,checkUser)


export default router1;