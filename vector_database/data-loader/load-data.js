import { ChromaClient } from "chromadb"
import fs from "node:fs"
import csv from "csv-parser"

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


fs.createReadStream("mpst_full_data.csv")
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
    await collection.add({ ids, documents, metadatas})
  })
