import mongoose from "mongoose";

const Schema = mongoose.Schema;

const choiceSchema = new Schema({
  quiz: {
    type: Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  choiceType: {
    type: String,
    enum: ["video", "image"],
  },
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  totalQuiz: {
    type: Number,
    default: 0,
  },
  totalMatch: {
    type: Number,
    default: 0,
  },
  win: {
    type: Number,
    default: 0,
  },
  lose: {
    type: Number,
    default: 0,
  },
  champ: {
    type: Number,
    default: 0,
  },
});

// Şampiyonluk oranı hesaplamak için sanal alan
choiceSchema.virtual("championRate").get(function () {
  if (this.totalQuiz === 0) {
    return null;
  }
  return ((this.champ / this.totalQuiz) * 100).toFixed(2);
});

// Maç kazanma oranı hesaplamak için sanal alan
choiceSchema.virtual("winRate").get(function () {
  if (this.totalMatch === 0) {
    return null;
  }
  return ((this.win / this.totalMatch) * 100).toFixed(2);
});

export default mongoose.model("Choice", choiceSchema);
