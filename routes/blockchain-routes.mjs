import express from 'express';
import { listBlock } from '../controllers/blockchain-controller.mjs';

const router = express.Router();

router.route('/').get(listBlock);

router.route('/:id').post(listBlock).get(listBlock);

export default router;