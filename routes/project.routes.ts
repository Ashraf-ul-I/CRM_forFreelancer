import express from 'express';
import {authenticate} from '../middlewares/auth.middleware'
import {createProject, deleteProject, updateProject} from '../controllers/project.controller';
const router = express.Router();

router.post('/create-project',authenticate,createProject)
router.patch('/update-project/:projectId',authenticate,updateProject);
router.delete('/delete-project/:projectId',authenticate,deleteProject)
export default router;
