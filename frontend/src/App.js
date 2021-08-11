import Header from './components/Header';
import { useState, useEffect } from 'react'
import { BookContext } from './contexts/BookContext';
import Search from './components/Search';
import Book from './components/Book';
import CurrentlyReading from './components/CurrentlyReading';
import Spinner from './components/Spinner';
import BookList from './components/BookList';
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
  Link
} from "react-router-dom";


function App() {
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [book, setBook] = useState({
    downloadLink: ""
  })
  const [err, setError] = useState(false)
  const history = useHistory();
  const location = useLocation()

  useEffect(() => {
    console.log(location.pathname)
    if (book["ID"]) {
      history.push(`/read`);
    }
    console.log(book)
  }, [book])
  useEffect(() => {
    if (search === "") {
      setResults([])
    }

  }, [search])

  return (
    <BookContext.Provider value={{ search, setSearch, book, setBook, setLoading, setError, results, setResults }}>
      <Router>

        <div className="App ">
          <Header />
          <Switch>
            <Route path={`/read/`}>
              <Book />
            </Route>
            <Route path="/" >
              <Search />
              {loading && <Spinner />}
              {err && !loading && <p> {err}</p>}
              {!loading && !err && results && <BookList />
              }
              {!loading && !err && <CurrentlyReading />}
            </Route>


          </Switch>

        </div >
        <Footer />
      </Router>
    </BookContext.Provider>
  );



}

export default App;
