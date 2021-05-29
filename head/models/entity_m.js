/**
 * @description     : Entity model
 * @author          : Sav
 * @group           : model
 * @lastModifiedOn  : 13-05-2021
 * @lastModifiedBy  : Sav
 * @ModificationLog :
 * @Ver @Date       @Author     @Modification
 * 1.0  13-05-2021  Sav         Entity model with { *firstname, *lastname, *email, *password, tabs, timestamps } attributes & with matchPassword method
 */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
    type: {
      type: String,
      required: true,
    },
    brief: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const entitySchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
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
    },
    tabs: {
      type: String,
      required: false,
      default: "Home,",
    },
    transactions: [txnScema],
  },
  {
    timestamps: true,
  }
);

entitySchema.methods.matchPassword = async function (typedPassword) {
  return typedPassword === this.password;
  // return await bcrypt.compare(typedPassword, this.password)
};

/*
entitySchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})
*/

export default mongoose.model("entities", entitySchema);
