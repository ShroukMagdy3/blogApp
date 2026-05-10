import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
   isPublic: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

const postModel = mongoose.models.posts || mongoose.model("posts", postSchema);

export default postModel