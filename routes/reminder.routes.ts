import express from 'express';
import {authenticate} from '../middlewares/auth.middleware'
import { createReminder, getRemindersThisWeek } from '../controllers/reminder.controller';
const router = express.Router();

router.post('/add/:projectId',authenticate,createReminder);
router.get('/get-reminder',authenticate,getRemindersThisWeek);

export default router;
