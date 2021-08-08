import Footer from './Footer';
import Header from './Header';
import { useRef, useState, useEffect, useContext } from 'react'
import {
  ReactEpubViewer
} from 'react-epub-viewer'
import BookItem from './BookItem';
import { BookContext } from './BookContext';
function App() {
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [err, setError] = useState(false)
  const viewerRef = useRef(null);
  const timer = useRef(null)

  const [bookContext, setBookContext] = useState("")

  useEffect(() => {

    clearTimeout(timer.current)
    if (search !== "") {
      timer.current = setTimeout(() => {
        console.log("rendering")
        setLoading(true)
        fetch(`http://localhost:5000/${search}`).then(res => res.json()).then(({ message }) => {
          setResults(message)
          setLoading(false)
          if (message.length === 0) {
            setError("No book found. Please try again ")
          }
        }).catch(err => {
          console.log(err)
          setLoading(false)
          setError(err)
        })
      }, 1000)
      return () => clearTimeout(timer.current)
    }

  }, [search, err])
  console.log(results)
  return (
    <BookContext.Provider value={{ bookContext, setBookContext }}>

      <div className="App bg-gray-20">
        <Header />
        {!bookContext && <>
          {<div className="flex justify-center">
            <input
              value={search} onChange={e => setSearch(e.target.value)} type="search" className=" text-center shadow rounded border-0 p-3 outline-none" placeholder="Search by name..." />
          </div >}

          {loading && <p>Loading results...</p>}
          {err && !loading && <p> {err}</p>}
          <div className="flex flex-wrap -mx-12 overflow-hidden sm:-mx-2 xl:-mx-2">
            {
              results.map(book => <BookItem key={book["ISBN"]} book={book} />)
            }
          </div>
        </>}
        {bookContext && <div style={{ position: "relative", height: "100%" }}>
          <ReactEpubViewer
            viewerOption={{
              flow: "paginated"
            }}
            url={bookContext}
            ref={viewerRef}
          />
        </div>}


        <Footer />
      </div >
    </BookContext.Provider >
  );
}

export default App;
