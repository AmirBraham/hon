import React, { useRef, useContext, useState, useEffect } from "react"
import { BookContext } from '../contexts/BookContext'
import { Link, useHistory } from "react-router-dom";
import Reader from "../containers/Reader"

function Book() {
    const [chapterName, setChapterName] = useState("");
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [rendition, setRendition] = useState(null);
    const history = useHistory();


    const onRenditionChanged = (rendition) => setRendition(rendition);
    const onPageChange = (pageInfo) => {
        if (pageInfo.chapterName)
            setChapterName(pageInfo.chapterName);
        setPage(pageInfo.currentPage)
        setTotalPage(pageInfo.totalPage);
    };
    const viewerRef = useRef(null);
    const { book } = useContext(BookContext)
    useEffect(() => {
        if (book.downloadLink === "") {
            history.push("/");
        }
    }, [])

    return (

        <>
            <p className="text-right px-6 " ><Link to="/">Go Back</Link></p>
              <Reader
                    url={book.downloadLink}
                    ref={viewerRef}
                />
        </>


    )
}

export default Book