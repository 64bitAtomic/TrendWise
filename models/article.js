import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  meta: String,
  media: Object, // images, tweets, videos
  content: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Article || mongoose.model("Article", ArticleSchema);
