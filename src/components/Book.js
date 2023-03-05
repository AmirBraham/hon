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
    useEffect(() => {
        if (!rendition) return;
        const savedBooks = JSON.parse(window.localStorage.getItem("hon"));
        if (savedBooks !== null && savedBooks[book["ID"]]) {
            const targetCFI = savedBooks[book["ID"]]["startCfi"];
            rendition.display(targetCFI);
        }

    }, [rendition]);


    const onRenditionChanged = (rendition) => setRendition(rendition);
    const onPageChange = (pageInfo) => {
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
    const viewerRef = useRef(null);
    const { book } = useContext(BookContext)
    useEffect(() => {
        if (book.downloadLink === "") {
            history.push("/");
        }
    }, [])

    return (

        <div>
            <p className="text-right px-6 " ><Link to="/">Go Back</Link></p>
              <Reader
                    url={book.downloadLink}
                    ref={viewerRef}
                />
        </div>


    )
}

export default Book