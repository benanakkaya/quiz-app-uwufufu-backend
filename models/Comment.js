import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    quiz: {
      type: mongoose.Types.ObjectId,
      ref: "Quiz",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
