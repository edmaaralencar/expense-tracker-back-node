import Saving from '../models/Saving.js'
import checkPermissions from '../utils/checkPermissions.js'

const createSaving = async (req, res) => {
  const { title, availableAmount, totalAmount } = req.body

  try {
    if (!title || !availableAmount || !totalAmount) {
      throw new Error('Preencha todos os campos')
    }

    req.body.createdBy = req.user.userId

    const saving = await Saving.create(req.body)

    res.status(201).json({ saving })
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

const getSavings = async (req, res) => {
  try {
    const savings = await Saving.find({ createdBy: req.user.userId })

    res.status(200).json({ savings })
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

const updateSaving = async (req, res) => {
  const { id: savingId } = req.params
  const { availableAmount, title, totalAmount } = req.body

  try {
    if (!availableAmount || !title || !totalAmount) {
      throw new Error('Preencha todos os campos')
    }

    const saving = await Saving.findOne({ _id: savingId })

    if (!saving) {
      return res.status(404).json({ message: 'Item da poupança não existe!' })
    }

    checkPermissions(req.user, saving.createdBy)

    const updatedSaving = await Saving.findOneAndUpdate(
      { _id: savingId },
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    res.status(200).json({ updatedSaving })
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

const deleteSaving = async (req, res) => {
  const { id: savingId } = req.params

  try {
    const saving = await Saving.findOne({ _id: savingId })

    if (!saving) {
      return res.status(404).json({ message: 'Item da poupança não existe!' })
    }

    checkPermissions(req.user, saving.createdBy)

    await saving.remove()

    res.status(200).json({ saving })
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export { createSaving, getSavings, updateSaving, deleteSaving }
