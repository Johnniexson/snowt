import mongoose from 'mongoose';

const { Schema } = mongoose;

const BusinessSchema = new Schema({
  image: {
    type: String,
  },
  company: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  oath: {
    type: Boolean,
    required: true,
  },
});
export default mongoose.model('Business', BusinessSchema, 'businesses');
