import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const model = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
)

model.methods.matchPassword = async function (typedPassword) {
  return await bcrypt.compare(typedPassword, this.password)
}

model.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

export default mongoose.model('entities', model)