/**
 * @description     : Deal model
 * @author          : Sav
 * @group           : model
 * @lastModifiedOn  : 05-06-2021
 * @lastModifiedBy  : Sav
 * @ModificationLog :
 * @Ver @Date       @Author     @Modification
 * 1.0  13-05-2021  Sav         Deal model with { *date, *amount, *actualAmount, *type,
 * *brief, description, *entity } attributes
 */
import mongoose from "mongoose";

const dealScema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    actualAmount: {
      type: Number,
    },
    type: {
      label: { type: String, required: true },
      value: { type: Number, required: true },
    },
    brief: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    entity: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("deals", dealScema);
