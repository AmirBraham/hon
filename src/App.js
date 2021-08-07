import { useState, useRef } from "react"
import Footer from './Footer';
import Header from './Header';
import { ReactReader } from "react-reader"

function App() {

  const [page, setPage] = useState('')
  const renditionRef = useRef(null)
  const tocRef = useRef(null)
  const locationChanged = (epubcifi) => {
    if (renditionRef.current && tocRef.current) {
      const { displayed, href } = renditionRef.current.location.start
      const chapter = tocRef.current.find((item) => item.href === href)
      setPage(`Page ${displayed.page} of ${displayed.total} in chapter ${chapter ? chapter.label : 'n/a'}`)
    }
  }
  return (
    <div className="App bg-gray-20">
      <Header />
      <div style={{ height: "100vh", position: "sticky" }}>


        <ReactReader

          locationChanged={locationChanged}
          url="https://gerhardsletten.github.io/react-reader/files/alice.epub"
          getRendition={(rendition) => renditionRef.current = rendition}
          tocChanged={toc => tocRef.current = toc}
        />
      </div>
      <div style={{ bottom: '1rem', right: '1rem', left: '1rem', textAlign: 'center', zIndex: 1 }}>
        {page}
      </div>


      {/* <div className="flex justify-center">
        <input type="search" className=" text-center shadow rounded border-0 p-3 outline-none" placeholder="Search by name..." />
      </div > */}

      <Footer />
    </div >
  );
}

export default App;
