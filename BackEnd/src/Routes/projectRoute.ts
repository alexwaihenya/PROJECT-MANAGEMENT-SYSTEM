import { Router } from "express";
import { assignProject, completeProject, createproject, deleteProject, getAllProjects } from "../Contollers/projectController";

const router = Router();

router.post("/createproject",createproject)
router.delete("/deleteproject/:id",deleteProject)
router.delete("/getallprojects",getAllProjects)
router.post("/assignproject",assignProject)
router.post('/completeproject',completeProject)

export default router;