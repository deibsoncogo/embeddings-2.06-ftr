import fs from "node:fs"
import tsne from "tsne-js"

let embeddings = JSON.parse(fs.readFileSync("../nearest-neighbors/embeddings.json"))

let model = new tsne({
  dim: 2,
  perplexity: 30.0,
  earlyExaggeration: 4.0,
  learningRate: 100.0,
  nIter: 1000,
  metric: "euclidean",
})

model.init({
  data: embeddings,
  type: "dense",
})

model.run()

let output = model.getOutput()

console.log("output =>", output)
