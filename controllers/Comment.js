import Comment from "../models/Comment.js";
import Quiz from "../models/Quiz.js";

export const NewComment = async (req, res) => {
  const { author, text, isAnonymous, quizID } = req.body;

  const quiz = await Quiz.findById(quizID);

  if (!quiz) {
    return res.status(404).json({ message: "Quiz not found" });
  }

  const newComment = await Comment.create({
    author,
    text,
    isAnonymous,
    quiz: quizID,
  });

  await Quiz.findByIdAndUpdate(quizID, { $push: { comments: newComment._id } });

  return res.status(201).json({ message: "Comment is created successfully" });
};

export const DeleteComment = async (req, res) => {
  const { id, quizID } = req.body;

  await Comment.findByIdAndDelete(id);

  await Quiz.findByIdAndUpdate(quizID, { $pull: { comments: id } });

  return res.status(200).json({ message: "Comment deleted successfully" });
};
