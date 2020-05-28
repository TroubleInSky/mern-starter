import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const commentSchema = new Schema({
  post: { type: 'ObjectId', ref: 'Post', require: true },
  author: { type: 'String', default: 'anonimous' },
  text: { type: 'String', required: true },
  ref: { type: 'ObjectId' },
});

export default mongoose.model('Comment', commentSchema);
