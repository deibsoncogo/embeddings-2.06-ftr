import { ChromaClient } from "chromadb"

const chromaClient = new ChromaClient()

const collection = await chromaClient.getOrCreateCollection({ name: "test" })

await collection.add({
  ids: ["1", "2", "3"],
  documents: ["Olá", "Oi", "Tudo bem"],
  metadatas: [
    { "title": "Meu Filme" },
    { "name": "Arthur" },
    { "age": 20 },
  ]
})
