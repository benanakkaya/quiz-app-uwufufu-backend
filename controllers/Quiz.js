import Choice from "../models/Choice.js";
import Quiz from "../models/Quiz.js";
import User from "../models/User.js";

export const NewQuiz = async (req, res) => {
  let { user } = req.body;

  const newQuiz = await Quiz.create({
    user,
    title: "",
    description: "",
  });

  await User.findByIdAndUpdate(user, { $push: { quizzes: newQuiz._id } });

  return res.status(201).json({ message: "Başarıyla oluşturuldu", newQuiz });
};

export const DeleteQuiz = async (req, res) => {
  const { quizId, user } = req.body;

  await Quiz.findByIdAndDelete(quizId);
  await User.findByIdAndUpdate(user, { $pull: { quizzes: quizId } });
  await Choice.deleteMany({ quiz: quizId });

  return res.status(200).json({ message: "Quiz başarıyla silindi..." });
};

export const GetQuiz = async (req, res) => {
  const { quizID } = req.body;

  const quiz = await Quiz.findById(quizID)
    .populate("choices")
    .populate({
      path: "comments",
      populate: {
        path: "author",
        model: "User",
      },
    })
    .populate("user");

  if (!quiz) return res.status(404).json({ message: "Quiz not found" });

  return res.status(200).json(quiz);
};

export const SearchQuiz = async (req, res) => {
  const { index } = req.body;

  const quizzes = await Quiz.find({ title: { $regex: index, $options: "i" } })
    .populate("choices")
    .sort({ createdAt: -1 });

  return res.status(200).json(quizzes);
};

export const GetEditQuiz = async (req, res) => {
  const { quizID, userID } = req.body;

  const quiz = await Quiz.findById(quizID)
    .populate("choices")
    .populate({
      path: "comments",
      populate: {
        path: "author",
        model: "User",
      },
    })
    .populate("user");

  if (quiz.user._id.toString() !== userID)
    return res.status(401).json({ message: "You are not authorized" });

  if (!quiz) return res.status(404).json({ message: "Quiz not found" });

  return res.status(200).json(quiz);
};

export const UpdateQuiz = async (req, res) => {
  const { _id, title, description, choices, coverImage, published } = req.body;

  const quiz = await Quiz.findById(_id);

  if (!quiz) return res.status(404).json({ message: "Quiz not found" });

  const updatedQuiz = await Quiz.findByIdAndUpdate(
    _id,
    {
      title,
      description,
      choices,
      coverImage,
      published,
    },
    { new: true }
  ).populate("choices");

  return res
    .status(200)
    .json({ message: "Quiz başarıyla güncellendi", quiz: updatedQuiz });
};

export const GetAllQuizzes = (req, res) => {
  Quiz.find({ published: true })
    .populate("choices")
    .sort({ createdAt: -1 })
    .then((quizzes) => {
      return res.status(200).json(quizzes);
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};

export const GetUserQuizzes = (req, res) => {
  const { userID } = req.body;

  Quiz.find({ user: userID })
    .populate("choices")
    .sort({ createdAt: -1 })
    .then((quizzes) => {
      return res.status(200).json(quizzes);
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};
