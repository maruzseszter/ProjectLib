import mongoose from 'mongoose';
import { BOOK_TYPE } from '../utils/constants.js';

const BookSchema = new mongoose.Schema( 
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    ISBN: {
      type: String,
      required: true,
      unique: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    bookType: {
      type: String,
      required: true,
      enum: Object.values(BOOK_TYPE),
      default: BOOK_TYPE.INFORMATICS,
    },
    quantity: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Book', BookSchema);