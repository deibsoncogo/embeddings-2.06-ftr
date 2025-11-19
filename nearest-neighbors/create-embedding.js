import { pipeline } from "@huggingface/transformers"
import fs from "node:fs"

const imgEmbedder = await pipeline(
  "image-feature-extraction",
  "Xenova/clip-vit-base-patch32",
  { dtype: "fp32" }
)

async function embedImg(imgs) {
  return imgEmbedder(imgs, { pooling: "cls", normalize: true }).then(t => t.tolist())
}

const images = fs.readSync("./train").map(f => "./train/" + f)
