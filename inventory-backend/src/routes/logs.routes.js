import express from 'express';
import { downloadPDF, getMonthlySummary } from '../controllers/logs.controller.js';

const router = express.Router();


router.get('/pdf', downloadPDF);
router.get('/monthly', getMonthlySummary);

export default router;
