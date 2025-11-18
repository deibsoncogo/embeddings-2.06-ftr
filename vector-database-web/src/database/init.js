import { ChromaClient } from "chromadb"
import { env } from "chromadb-default-embed"
import { useEffect, useState } from "react"

env.useBrowserCache = false
env.allowLocalModels = false

export function useChroma (collectionName) {
  const [chromaCollection, setChromaCollection] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const initializeChroma = async () => {
      const chromaClient = new ChromaClient()

      const collection = await chromaClient.getOrCreateCollection({
        name: collectionName, space: "cosine"
      })

      setChromaCollection(collection)
      setIsConnected(true)
    }

    initializeChroma()
  }, [])

  return [chromaCollection, isConnected]
}
