import Footer from './Footer';
import Header from './Header';
import { useRef, useState, useEffect } from 'react'
import {
  EpubViewer,
  ReactEpubViewer
} from 'react-epub-viewer'
function App() {
  const [search, setSearch] = useState("")
  const [results, setResults] = useState([])
  const viewerRef = useRef(null);
  const timer = useRef(null)

  useEffect(() => {

    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      fetch("http://127.0.0.1:5000/").then(res => {
        console.log(res)
      })
    }, 1000)

  }, [search])
  return (
    <div className="App bg-gray-20">
      <Header />
      {<div className="flex justify-center">
        <input
          value={search} onChange={e => setSearch(e.target.value)} type="search" className=" text-center shadow rounded border-0 p-3 outline-none" placeholder="Search by name..." />
      </div >}

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
