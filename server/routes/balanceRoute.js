import express from 'express';
import { createBalance, updateBalance, getAllBalance, getBalanceByID,deleteBalance} from '../controller/balanceController.js';

const route = express.Router();
route.post('/balance', createBalance);
route.put('/update/balance/:cid', updateBalance);
route.get('/balance', getAllBalance);
route.get('/balance/:cid', getBalanceByID);
route.delete('/delete/balance/:cid', deleteBalance);

export default route;