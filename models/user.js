import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      require: true,
    },
    avatarUrl: String,
    resume_id: String,
  },
  { timestamps: true },
);

export default mongoose.model('user', UserSchema);
