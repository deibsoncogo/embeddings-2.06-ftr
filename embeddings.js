import { cos_sim, pipeline } from "@huggingface/transformers"

const embedder = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2",
  { dtype: "q8"}
)

async function embedText(text) {
  return embedder(text, { pooling: "mean", normalize: true })
    .then(t => t.tolist()[0])
}

console.log("embedText =>", cos_sim(
  await embedText("king"),
  await embedText("man"),
))
