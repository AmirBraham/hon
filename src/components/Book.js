import React, { useRef, useContext, useState, useEffect } from "react"
import { BookContext } from '../contexts/BookContext'
import {
    EpubViewer
} from 'react-epub-viewer'
import { Link, useHistory } from "react-router-dom";
import Spinner from './Spinner';

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

    useEffect(() => {
        let touchstartX = 0
        let touchendX = 0

        const slider = document.getElementById('slider')

        function handleGesture() {
            console.log(touchendX - touchstartX)
            if (touchendX - touchstartX < -80) viewerRef.current.nextPage()
            if (touchendX - touchstartX > 80) viewerRef.current.prevPage()
        }

        slider.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenX
        })

        slider.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenX
            handleGesture()
        })
    }, [])
    return (

        <div>

            <p className="text-right px-6 " ><Link to="/">Go Back</Link></p>
            {totalPage > 0 && <h2 className="text-left px-6">
                Page: {page} / {totalPage}  [{chapterName}]
            </h2>}
            <div style={{ height: "100vh", position: "relative" }} id="slider" >


                <EpubViewer

                    ref={viewerRef}
                    url={book.downloadLink}
                    pageChanged={onPageChange}
                    loadingView={<Spinner />}
                    rendtionChanged={onRenditionChanged}
                />

            </div>

        </div>


    )
}

export default Book