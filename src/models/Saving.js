import mongoose from 'mongoose'

const SavingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Forneça o título'],
    trim: true
  },
  availableAmount: {
    type: Number,
    required: [true, 'Forneça a quantidade disponível']
  },
  totalAmount: {
    type: Number,
    required: [true, 'Forneça a quantidade total']
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Forneça o usuário']
  }
})

export default mongoose.model('Saving', SavingSchema)
