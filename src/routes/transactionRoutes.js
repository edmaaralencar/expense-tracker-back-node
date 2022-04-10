import { Router } from 'express'

import {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction
} from '../controllers/transactionController.js'

const router = Router()

router.route('/').get(getTransactions).post(createTransaction)
router.route('/:id').delete(deleteTransaction).patch(updateTransaction)

export default router
