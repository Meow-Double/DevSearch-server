import mongoose from 'mongoose';

const TestSchema = new mongoose.Schema(
  {
    test: {
      type: String,
      default: 'test',
    },
  },
  { timestamps: true },
);

export default mongoose.model('test', TestSchema);
