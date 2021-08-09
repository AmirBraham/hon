import Header from './Header';
import { useState, useRef } from 'react'
import {
  ReactEpubViewer
} from 'react-epub-viewer'
import BookItem from './BookItem';
import { BookContext } from './BookContext';
import Search from './components/Search';
function App() {
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [book, setBook] = useState("")
  const [err, setError] = useState(false)
  const viewerRef = useRef(null);


  const searchForBook = (searchBy = "Title") => {

    setLoading(true)
    setError(false)
    fetch(`http://localhost:5000/${search}?search_by=${searchBy}`).then(res => res.json()).then(({ message }) => {
      setResults(message)
      setLoading(false)
      if (message.length === 0) {
        setError("No book found. Please try again ")
      }
    })
      .catch(err => {
        console.log(err)
        setLoading(false)
        setError(true)
      })

  }
  return (
    <BookContext.Provider value={{ search, setSearch, book, setBook }}>

      <div className="App ">
        <Header />
        {!book && <>
          <Search searchForBook={searchForBook} />
          {loading && <div className="w-full py-12 "> <div className="mx-auto loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-14 w-14"></div></div>}
          {err && !loading && <p> {err}</p>

          }

          {!loading && !err && results && <div className="grid grid-cols-4 gap-4 justify-items-center">
            {
              results.map(book => <BookItem key={book["ISBN"]} book={book} />)
            }
          </div>
          }
        </>
        }
        {book && <div style={{ position: "relative", height: "100%" }}>
          <ReactEpubViewer
            viewerOption={{
              flow: "paginated"
            }}
            url={book}
            ref={viewerRef}
          />
        </div>}

      </div >
    </BookContext.Provider >
  );
}

export default App;
