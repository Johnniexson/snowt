import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  image: {
    type: String,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
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
  sex: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
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
export default mongoose.model('User', UserSchema, 'users');
