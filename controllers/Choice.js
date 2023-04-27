import Choice from "../models/Choice.js";
import Quiz from "../models/Quiz.js";

export const NewChoice = async (req, res) => {
  const { quiz, choiceType, url, title } = req.body;

  const newChoice = await Choice.create({
    quiz,
    choiceType,
    url,
    title,
  });

  await Quiz.findByIdAndUpdate(quiz, { $push: { choices: newChoice._id } });

  return res
    .status(201)
    .json({ message: "Seçim başarıyla oluşturuldu.", newChoice });
};

export const WinningChoice = async (req, res) => {
  const { id } = req.body;

  const winningChoice = await Choice.findById(id).populate("quiz").exec();

  if (!winningChoice) {
    return res.status(404).json({ message: "Hata, böyle bir seçim yok" });
  }

  winningChoice.win += 1;
  winningChoice.totalMatch += 1;
  winningChoice.save();

  const winRate = winningChoice.get("winRate");

  return res
    .status(200)
    .json({ message: "Seçiminiz başarıyla işlendi", winningChoice, winRate });
};

export const LosingChoice = async (req, res) => {
  const { id } = req.body;
  const losingChoice = await Choice.findById(id);

  if (!losingChoice) {
    return res.status(404).json({ message: "Hata, böyle bir seçim yok" });
  }

  losingChoice.lose += 1;
  losingChoice.totalMatch += 1;
  losingChoice.save();

  return res.status(200).json({ message: "Seçiminiz başarıyla işlendi" });
};

export const ChampChoice = async (req, res) => {
  const { id } = req.body;
  const champChoice = await Choice.findById(id);

  if (!champChoice) {
    return res.status(404).json({ message: "Hata, böyle bir seçim yok" });
  }

  champChoice.champ += 1;
  champChoice.save();

  return res.status(200).json({ message: "Seçiminiz başarıyla işlendi" });
};

export const GetGameChoices = async (req, res) => {
  const { quizID, quizType } = req.body;

  const quiz = await Quiz.findById(quizID).populate("choices");

  if (!quiz) {
    return res.status(404).json({ message: "Hata, böyle bir quiz yok" });
  }

  if (quiz.choices.length < quizType) {
    return res
      .status(404)
      .json({ message: "Hata, bu quizde bu format için yeterli seçim yok!" });
  }

  const allChoices = await quiz.choices;

  const shuffledChoices = await shuffleArray(allChoices);

  const gameChoices = await shuffledChoices.slice(0, quizType);

  for (const choice of gameChoices) {
    choice.totalQuiz += 1;
    await choice.save();
  }
  return await res.status(200).json(gameChoices);
};

export const DeleteChoice = async (req, res) => {
  const { choiceId, quizId } = req.body;

  await Quiz.findByIdAndUpdate(quizId, { $pull: { choices: choiceId } });
  await Choice.findByIdAndDelete(choiceId);

  return res.status(200).json({ message: "Seçiminiz başarıyla silindi" });
};

export const EditChoice = async (req, res) => {
  const { _id, title, url } = req.body;
  const choice = await Choice.findByIdAndUpdate(
    _id,
    { title, url },
    { new: true }
  );

  return res.status(200).json({ message: "Choice updated successfully" });
};

function shuffleArray(arr) {
  // Dizinin son elemanından başlayarak ilk elemana kadar döngü oluşturuyoruz
  for (let i = arr.length - 1; i > 0; i--) {
    // Dizinin 0 ve i arasındaki rastgele bir sayı seçiyoruz
    const j = Math.floor(Math.random() * (i + 1));
    // Dizinin i. elemanı ile j. elemanını değiştiriyoruz
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
