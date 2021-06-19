/**
 * @description     : Reserve model
 * @author          : Sav
 * @group           : model
 * @lastModifiedOn  : 13-05-2021
 * @lastModifiedBy  : Sav
 * @ModificationLog :
 * @Ver @Date       @Author     @Modification
 * 1.0  13-05-2021  Sav         Reserve model with { *Deposit, *Amount, *Interest /cent,
 * *Term type, *Created Date } attributes
 */
 import mongoose from "mongoose";
 
 const reserveSchema = mongoose.Schema(
   {
      "Deposit": {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
     "Interest /cent": {
       type: Number,
       required: true,
     },
     "Term type": {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
     "Created Date": {
        type: Date,
        required: true,
     },
     "Amount": {
      type: Number,
      required: true,
     },
     "Aiming for": {
        type: Date,
        required: true,
      },
      "Amount if achieved": {
        type: Number,
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
 
 export default mongoose.model("reserves", reserveSchema);
 