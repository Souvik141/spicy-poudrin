import mongoose from 'mongoose'

const model = mongoose.Schema(
  {
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
      type: String,
      required: true
    },
    brief: {
      type: String,
      required: true
    },
    description: {
        type: String,
        required: false
    }
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('txns', model)