import mongoose from 'mongoose';

const { Schema } = mongoose;

const ContactSchema = new Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
  },
  location: {
    type: String,
  },
});
export default mongoose.model('Contact', ContactSchema, 'contacts');
