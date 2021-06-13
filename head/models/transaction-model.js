/**
 * @description     : Transaction model
 * @author          : Sav
 * @group           : model
 * @lastModifiedOn  : 05-06-2021
 * @lastModifiedBy  : Sav
 * @ModificationLog :
 * @Ver @Date       @Author     @Modification
 * 1.0  13-05-2021  Sav         Entity model with { *firstname, *lastname, *email, *password, tabs, timestamps } attributes & with matchPassword method
 */
import mongoose from "mongoose";

const txnScema = mongoose.Schema(
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

export default mongoose.model("transactions", txnScema);
