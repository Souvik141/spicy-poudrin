import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const model = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true
    }
  }
)

export default mongoose.model('tabs', model)