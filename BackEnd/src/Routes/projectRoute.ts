import { Router } from "express";
import { assignProject, completeProject, createproject, deleteProject, getAllProjects, pendingProjects } from "../Contollers/projectController";

const router = Router();

router.post("/createproject",createproject)
router.delete("/deleteproject/:id",deleteProject)
router.post("/getallprojects",getAllProjects)
router.post("/assignproject",assignProject)
router.post('/pendingprojects', pendingProjects)
router.post('/completeproject',completeProject)

export default router;