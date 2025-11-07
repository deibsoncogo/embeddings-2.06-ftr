import './app.css'

export function App() {

  return (
    <>
      <h1>Movie Recommender</h1>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <textarea type="text" />
        <button>Submit</button>
      </div>

      <div className="movie-list" style={{ margin: "15px" }}>
        <div className="movie-card" style={{
          border: "1px solid lightgrey",
          margin: "10px",
          width: "100%",
          height: "100px"
        }}>

        </div>
      </div>
    </>
  )
}
