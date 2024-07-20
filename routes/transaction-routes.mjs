import express from 'express';
import {
    addTransaction,
    getTransactionPool,
    getWalletBalance,
    mineTransactions,
} from '../controllers/transaction-controller.mjs';
import { authorize, protect } from '../middleware/authorization.mjs';

const transactionRouter = express.Router();

transactionRouter.use(protect);

transactionRouter.route('/').get(getTransactionPool);
transactionRouter.route('/wallet').get(getWalletBalance);


transactionRouter.use(authorize('admin', 'manager'));

transactionRouter.route('/transaction').post(addTransaction);
transactionRouter.route('/mine').get(mineTransactions);

export default transactionRouter;
