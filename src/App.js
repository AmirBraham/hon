import Header from './Header';
import { useState, useRef, useEffect } from 'react'
import {
  EpubViewer
} from 'react-epub-viewer'
import BookItem from './BookItem';
import { BookContext } from './BookContext';
import Search from './components/Search';
function App() {

  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [book, setBook] = useState({
    downloadLink: ""
  })
  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([])
  const [err, setError] = useState(false)
  const viewerRef = useRef(null);
  const [rendition, setRendition] = useState(null);
  const [chapterName, setChapterName] = useState("");
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const onRenditionChanged = (rendition) => setRendition(rendition);
  const onPageChange = (pageInfo) => {
    console.log(pageInfo)
    if (pageInfo.chapterName)
      setChapterName(pageInfo.chapterName);
    setPage(pageInfo.currentPage)
    setTotalPage(pageInfo.totalPage);
    let savedBooks = {}
    if (window.localStorage.getItem("hon") !== null) {
      savedBooks = JSON.parse(window.localStorage.getItem("hon"))
    } else {
      window.localStorage.setItem("hon", "{}")
    }
    savedBooks[book["ID"]] = { ...book, "startCfi": pageInfo.startCfi }
    window.localStorage.setItem("hon", JSON.stringify(savedBooks));
  };
  useEffect(() => {
    if (!rendition) return;
    const savedBooks = JSON.parse(window.localStorage.getItem("hon"));
    if (savedBooks !== null && savedBooks[book["ID"]]) {
      const targetCFI = savedBooks[book["ID"]]["startCfi"];
      rendition.display(targetCFI);
    }

  }, [rendition]);
  useEffect(() => {
    if (search === "") {
      setResults([])
    }

  }, [search])
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

  useEffect(() => {
    if (window.localStorage.getItem("hon")) {
      const savedBooks = JSON.parse(window.localStorage.getItem("hon"))
      setCurrentlyReadingBooks(Object.values(savedBooks))

    }
  }, [])
  const isCurrentlyReading = book.downloadLink !== ""
  console.log(book)
  return (
    <BookContext.Provider value={{ search, setSearch, book, setBook }}>

      <div className="App ">
        <Header />
        {!isCurrentlyReading && <>
          <Search searchForBook={searchForBook} />
          {loading && <div className="w-full py-12 "> <div className="mx-auto loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-14 w-14"></div></div>}
          {err && !loading && <p> {err}</p>

          }

          {!loading && !err && results && <div className="grid grid-cols-4 gap-4 justify-items-center">
            {
              results.map(book => <BookItem key={book["ID"]} book={book} />)
            }
          </div>
          }
        </>
        }
        {isCurrentlyReading && <div style={{ position: "relative", height: "100vh" }}>
          <h2>
            Page: {page} / {totalPage} [{chapterName}]
          </h2>
          <EpubViewer
            ref={viewerRef}
            url={book.downloadLink}
            pageChanged={onPageChange}
            rendtionChanged={onRenditionChanged}
          />
        </div>}
        {!isCurrentlyReading && !loading && !err && currentlyReadingBooks && <>
          <p>Currently Reading : </p>
          <div className="grid grid-cols-4 gap-4 justify-items-center">
            {
              currentlyReadingBooks.map(book => <BookItem key={book["ID"]} book={book} />)
            }
          </div>
        </>
        }


      </div >
    </BookContext.Provider>
  );



}

export default App;
