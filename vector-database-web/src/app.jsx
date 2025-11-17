import { ChromaClient } from "chromadb"
import { env } from "chromadb-default-embed"
import { useEffect, useState } from "react"
import movieMock from "../movie-mock.json"
import "./app.css"

env.useBrowserCache = false
env.allowLocalModels = false

function MovieTag({ tag }) {
  return <div className="movie-tag">{tag}</div>
}

function MovieCard({ id, title, tags, synopsis, distance, img }) {
  const apiKey = import.meta.VITE_OMDB_API_KEY
  const src = apiKey ? `https://img.omdbapi.com/?apiKey=${apiKey}&i=${id}` : img

  return (
    <div className="movie-card">
      <img className="movie-card-img" src={src} />

      <div className="movie-info">
        <div className="title-container">
          <h2 className="movie-title">
            <a href={`https:www.imdb.com/title/${id}`} target="_blank">
              {title}
            </a>
          </h2>

          <div className="title-background" style={{width: `${distance*100}%`}} />
        </div>

        <b>Tags</b>

        <div className="tag-container">
          <div className="tag-holder">
            {tags.map((t, idx) => <MovieTag key={idx} tag={t} />)}
          </div>
        </div>

        <b>Synopsis</b>

        <div className="synopsis">{synopsis}</div>
      </div>
    </div>
  )
}

function LoadingIndicator(){
  return (
    <div className="loading-container">
      Loading...
    </div>
  )
}

export function App() {
  const [chromaCollection, setChromaCollection] = useState(null)
  const [movieList, setMovieList] = useState(movieMock)
  const [isLoading, setIsLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [queryText, setQueryText] = useState("")

  async function queryDatabase() {
    setIsLoading(true)

    try {
      const res = await chromaCollection.query({ queryTexts: queryText })
      const movies = []

      const distances = res.distances[0].map(d => ((1-d)+1)/2)

      for (let i = 0; i < res.ids[0].length; i++) {
        movies.push({
          id: res.ids[0][i],
          distance: distances[i],
          title: res.metadatas[0][i].title,
          tags: res.metadatas[0][i].tags.split(", "),
          synopsis: res.metadatas[0][i].synopsis,
        })
      }

      setMovieList(movies)
    } catch (error) {
      console.error("error =>", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const initializeChroma = async () => {
      const chromaClient = new ChromaClient()

      const collection = await chromaClient.getOrCreateCollection({
        name: "movies", space: "cosine"
      })

      setChromaCollection(collection)
      setIsConnected(true)
    }

    initializeChroma()
  }, [])

  return (
    <>
      <h1>Movie Recommender</h1>

      <div className="form-container">
        <textarea onChange={e => setQueryText(e.target.value)} />

        <button onClick={queryDatabase} disabled={!isConnected || isLoading}>
          Submit
        </button>
      </div>

      {isLoading ? <LoadingIndicator /> : null}

      <div className="movie-list">
        {movieList.map((m, idx) => <MovieCard key={idx} {...m} />)}
      </div>
    </>
  )
}
