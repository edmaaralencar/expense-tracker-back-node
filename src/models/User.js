import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Forneça o nome'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Forneça o email'],
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Forneça a senha'],
    trim: true,
    select: false
  }
})

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })
}

UserSchema.methods.comparePassword = async function (comparedPassword) {
  return await bcrypt.compare(comparedPassword, this.password)
}

export default mongoose.model('User', UserSchema)
