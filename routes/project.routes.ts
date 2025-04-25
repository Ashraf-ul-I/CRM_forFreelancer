import express from 'express';
import {authenticate} from '../middlewares/auth.middleware'
import {createProject, deleteProject, getProjectByCLientId, getProjectData, updateProject} from '../controllers/project.controller';
const router = express.Router();

router.post('/create-project',authenticate,createProject)
router.patch('/update-project/:projectId',authenticate,updateProject);
router.delete('/delete-project/:projectId',authenticate,deleteProject)
router.get('/project-data/:projectId',authenticate,getProjectData);
router.get('/get-project/:clientId',authenticate,getProjectByCLientId);

export default router;
