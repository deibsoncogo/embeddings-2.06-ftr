import { cos_sim, pipeline } from "@huggingface/transformers"

const textEmbedder = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2",
  { dtype: "q8"}
)

const imgEmbedder = await pipeline(
  "image-feature-extraction",
  "Xenova/clip-vit-base-patch32",
  { dtype: "q8"}
)

async function embedText(text) {
  return textEmbedder(text, { pooling: "mean", normalize: true })
    .then(t => t.tolist()[0])
}

async function embedImg(img) {
  return imgEmbedder(img, { pooling: "cls", normalize: true })
    .then(t => t.tolist()[0])
}

console.log("embedText =>", cos_sim(
  await embedText("king"),
  await embedText("man"),
))

const babyHippo1 = "https://outdoors.com/wp-content/uploads/2024/09/baby-pygmy-hippo-Moo-Deng.jpeg"
const babyHippo2 = "https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg"

console.log("embedImg =>", cos_sim(
  await embedImg(babyHippo1),
  await embedImg(babyHippo2),
))
