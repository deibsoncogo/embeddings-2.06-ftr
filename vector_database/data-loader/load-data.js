import { ChromaClient } from "chromadb"
import csv from "csv-parser"
import fs from "node:fs"

const chromaClient = new ChromaClient()

const collection = await chromaClient.getOrCreateCollection({ name: "movies" })

await collection.add({
  ids: ["1", "2", "3"],
  documents: ["Olá", "Oi", "Tudo bem"],
  metadatas: [
    { "title": "Meu Filme" },
    { "name": "Arthur" },
    { "age": 20 },
  ]
})

const ids = []
const documents = []
const metadatas = []

fs.createReadStream("mpst-full-data.csv")
  .pipe(csv())
  .on("data", (row) => {
    const document = {
      "title": row["title"], "tags": row["tags"], "synopsis": row["synopsis"]
    }

    ids.push(row["imdb_id"])
    documents.push(JSON.stringify(document))
    metadatas.push(document)
  })
  .on("end", async () => {
    let startIdx = 0

    while (startIdx < ids.length) {
      let endIdx = startIdx + 500

      console.log(`Adding documents from ${startIdx} to ${endIdx}`)

      await collection.add({
        ids: ids.slice(startIdx, endIdx),
        documents: documents.slice(startIdx, endIdx),
        metadatas: metadatas.slice(startIdx, endIdx),
      })

      startIdx = endIdx
    }

    console.log("Done!")
  })
