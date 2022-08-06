import { Router } from "express";
import { projectController } from "../Contollers/projectController";

const router = Router();

router.post("/createproject",projectController)

export default router;