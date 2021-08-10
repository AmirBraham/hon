import Header from './components/Header';
import { useState, useEffect } from 'react'
import { BookContext } from './contexts/BookContext';
import Search from './components/Search';
import Book from './components/Book';
import CurrentlyReading from './components/CurrentlyReading';
import Spinner from './components/Spinner';
import BookList from './components/BookList';
function App() {
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [book, setBook] = useState({
    downloadLink: ""
  })
  const [err, setError] = useState(false)

  useEffect(() => {
    if (search === "") {
      setResults([])
    }

  }, [search])

  const isCurrentlyReading = book.downloadLink !== ""
  return (
    <BookContext.Provider value={{ search, setSearch, book, setBook, setLoading, setError, results, setResults }}>

      <div className="App ">
        <Header />
        {!isCurrentlyReading && <>
          <Search />
          {loading && <Spinner />}
          {err && !loading && <p> {err}</p>}
          {!loading && !err && results && <BookList />
          }
        </>
        }
        {isCurrentlyReading && <Book />}
        {!isCurrentlyReading && !loading && !err && <CurrentlyReading />}


      </div >
    </BookContext.Provider>
  );



}

export default App;
