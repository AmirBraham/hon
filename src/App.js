import Footer from './Footer';
import Header from './Header';
import { useRef, useState, useEffect } from 'react'
import {
  EpubViewer,
  ReactEpubViewer
} from 'react-epub-viewer'
import BookItem from './BookItem';
function App() {
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const viewerRef = useRef(null);
  const timer = useRef(null)

  useEffect(() => {

    clearTimeout(timer.current)
    if (search !== "") {
      timer.current = setTimeout(() => {
        console.log("rendering")
        setLoading(true)
        fetch(`http://localhost:5000/${search}`).then(res => res.json()).then(({ message }) => {
          setResults(message)
          setLoading(false)
        }).catch(err => {
          console.log(err)
          setLoading(false)
        })
      }, 1000)
      return () => clearTimeout(timer.current)
    }

  }, [search])
  console.log(results)

  return (
    <div className="App bg-gray-20">
      <Header />
      {<div className="flex justify-center">
        <input
          value={search} onChange={e => setSearch(e.target.value)} type="search" className=" text-center shadow rounded border-0 p-3 outline-none" placeholder="Search by name..." />
      </div >}

      {loading && <p>Loading results...</p>}

      {
        results.map(book => <BookItem key={book["ISBN"]} book={book} />
        )
      }
      {/* <div style={{ position: "relative", height: "100%" }}>
        <ReactEpubViewer
          viewerOption={{
            flow: "paginated"
          }}
          url={'https://gerhardsletten.github.io/react-reader/files/alice.epub'}
          ref={viewerRef}
        />
      </div> */}


      <Footer />
    </div >
  );
}

export default App;
