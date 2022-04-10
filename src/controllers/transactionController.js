import Transaction from '../models/Transaction.js'
import checkPermissions from '../utils/checkPermissions.js'

const createTransaction = async (req, res) => {
  const { title, amount, type, category } = req.body
  try {
    if (!title || !amount || !category || !type) {
      throw new Error('Preencha todos os campos')
    }

    req.body.createdBy = req.user.userId

    const transaction = await Transaction.create(req.body)

    res.status(201).json({ transaction })
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ createdBy: req.user.userId })

    res.status(200).json({ transactions })
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

const deleteTransaction = async (req, res) => {
  const { id: transactionId } = req.params

  try {
    const transaction = await Transaction.findOne({ _id: transactionId })

    if (!transaction) {
      return res.status(404).json({ message: 'Transação não existe!' })
    }

    checkPermissions(req.user, transaction.createdBy)

    await transaction.remove()

    res.status(200).json({ transaction })
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

const updateTransaction = async (req, res) => {
  const { title, amount, category } = req.body
  const { id: transactionId } = req.params

  try {
    if (!title || !amount || !category) {
      throw new Error('Preencha todos os campos')
    }

    const transaction = await Transaction.findOne({ _id: transactionId })

    if (!transaction) {
      return res.status(404).json({ message: 'Transação não existe!' })
    }

    checkPermissions(req.user, transaction.createdBy)

    const updatedTransaction = await Transaction.findOneAndUpdate(
      {
        _id: transactionId
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    res.status(200).json({ updatedTransaction: transaction })
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
}
