import express from 'express';
import {
  addProduct,
  getProducts,
  updateMaster
} from '../controllers/product.controller.js';

const router = express.Router();


router.get('/', getProducts);


router.post('/', addProduct);


router.put('/:id/master', updateMaster);

export default router;
