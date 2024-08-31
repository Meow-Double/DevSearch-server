import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
    specialization: {
      type: String,
      default: '',
    },
    about: {
      type: String,
      default: '',
    },
    contacts: {
      type: Array,
      default: [],
    },
    technologies: {
      type: Array,
      default: [],
    },
    skills: {
      type: Array,
      default: [],
    },
    workExperience: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
);

export default new mongoose.model('resume', ResumeSchema);
