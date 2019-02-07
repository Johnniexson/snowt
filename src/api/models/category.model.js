import mongoose from 'mongoose';

const { Schema } = mongoose;

const CategorySchema = new Schema({
  userId: {
    type: String,
  },
  label: {
    type: String,
    required: true,
    trim: true,
  },
});
export default mongoose.model('Category', CategorySchema, 'categories');
