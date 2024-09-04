import mongoose from 'mongoose';

const WorkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    specialization: {
      type: String,
      default: '',
    },
    company_name: {
      type: String,
      default: '',
    },
    workExperience: {
      type: String,
      default: '',
    },
    paycheck: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      default: '',
    },
    requirements: {
      type: Array,
      default: [],
    },
    specialization_desc: {
      type: String,
      default: '',
    },
    job_desc: {
      type: String,
      default: '',
    },
    backgroundImg: {
      type: String,
      optional: true,
    },
    technologies: {
      type: Array,
      default: [],
    },
    watching_number: {
      type: Number,
      default: 0,
    },
    responded_number: {
      type: Number,
      default: 0,
    },
    author: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true },
);

export default new mongoose.model('work', WorkSchema);
