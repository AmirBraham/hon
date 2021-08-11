import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookContext } from '../contexts/BookContext'

function BookItem(props) {
    const { setBook, results } = useContext(BookContext)
    const [bookIsInSaved, setBookIsInSaved] = useState(false)
    const { Author, ISBN, Language, Image, Title, Size, Pages, Mirror_1, ID } = props.book

    const getDownloadLink = (callback) => {
        if (props.book.downloadLink) {
            callback(props.book)
        } else {

            fetch(`/d/?url=${Mirror_1}`).then(res => res.json()).then(({ message }) => {
                console.log(message)
                callback({ ...props.book, downloadLink: message["Cloudflare"] })
            }).catch(err => console.log(err))
        }
    }


    useEffect(() => {
        if (window.localStorage.getItem("hon") == null) {
            setBookIsInSaved(false)
        } else {
            const savedBooks = JSON.parse(window.localStorage.getItem("hon"))
            setBookIsInSaved(savedBooks[ID] != undefined)
        }

    }, [bookIsInSaved])
    return (
        <div className="flex  w-full flex-col   object-contain  self-center text-center ">
            <img className="w-32 m-auto shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-200  rounded-3xl" src={`${Image}`} alt="" />

            <h2 className="text-sm font-bold py-2">{Title}</h2>
            <div className="text-lg text-gray-800">{Author}</div>
            <button onClick={() => getDownloadLink(setBook)}>
                <Link to="/read/">
                    Read
                </Link>
            </button>
            {bookIsInSaved && results.length == 0 && <p onClick={() => {
                if (props.removeBookFromSaved) {
                    props.removeBookFromSaved(ID)
                }
            }}>Remove from list</p>}


        </div>

    )
}

export default BookItem