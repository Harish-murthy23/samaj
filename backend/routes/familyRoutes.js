import express from 'express';
import {
  createFamily,
  getFamilies,
  getFamilyById,
  deleteFamily,
  downloadFamilyPdf
} from '../controllers/familyController.js';

const router = express.Router();

// Family registration routes
router.get('/download-pdf/:appNumber', downloadFamilyPdf);
router.post('/', createFamily);
router.get('/', getFamilies);
router.get('/:id', getFamilyById);
router.delete('/:id', deleteFamily);

export default router;