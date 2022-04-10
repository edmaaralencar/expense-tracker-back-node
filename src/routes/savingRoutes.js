import { Router } from 'express'

import {
  getSavings,
  createSaving,
  updateSaving,
  deleteSaving
} from '../controllers/savingController.js'

const router = Router()

router.route('/').get(getSavings).post(createSaving)
router.route('/:id').patch(updateSaving).delete(deleteSaving)

export default router
