import mongoose from 'mongoose';

const { Schema } = mongoose;

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  knowt: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  authorId: {
    type: String,
  },
  dateCreated: {
    type: Date,
  },
});
export default mongoose.model('Note', NoteSchema, 'notes');
