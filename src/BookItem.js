import React, { useContext } from 'react'
import { BookContext } from './BookContext'

function BookItem(props) {
    const { setBook } = useContext(BookContext)
    const { Author, ISBN, Language, Image, Title, Size, Pages, DownloadLinks } = props.book
    return (
        <div className="flex  w-full flex-col   object-contain  self-center text-center ">
            <img className="w-32 m-auto shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-200  rounded-3xl" src={`${Image}`} alt="" />
            <h2 className="text-sm font-bold py-2">{Title}</h2>
            <div className="text-lg text-gray-800">{Author}</div>
            <button onClick={() => setBook(DownloadLinks["Cloudflare"])}>
                Read
            </button>

        </div>

    )
}

export default BookItem