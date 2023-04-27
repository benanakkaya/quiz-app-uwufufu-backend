import mongoose from "mongoose";

const Schema = mongoose.Schema;

const quizSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    coverImage: {
      type: String,
      required: false,
    },
    choices: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Choice",
      },
    ],
    totalQuizPlay: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    published: {
      type: Boolean,
      default: false,
    },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", quizSchema);
