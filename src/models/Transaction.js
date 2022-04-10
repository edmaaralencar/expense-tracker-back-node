import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Forneça o título'],
      trim: true
    },
    amount: {
      type: Number,
      required: [true, 'Forneça a quantidade']
    },
    category: {
      type: String,
      required: [true, 'Forneça a categoria'],
      trim: true
    },
    type: {
      type: String,
      enum: ['deposit', 'withdraw'],
      default: 'deposit',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Forneça o usuário']
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Transaction', TransactionSchema)
