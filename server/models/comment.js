import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const commentSchema = new Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', require: true },
  author: { type: 'String', default: 'anonimous' },
  text: { type: 'String', required: true },
});

export default mongoose.model('Comment', commentSchema);
