import mongoose from 'mongoose';

const RenspondSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    responds: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
);

export default new mongoose.model('respond', RenspondSchema);

// {
//     workId:"",
//     status:''
// }
