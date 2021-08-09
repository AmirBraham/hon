import React, { useContext } from 'react'
import { BookContext } from './BookContext'

function BookItem(props) {
    const { bookContext, setBookContext } = useContext(BookContext)
    const { Author, ISBN, Language, Image, Title, Size, Pages, DownloadLinks } = props.book
    console.log(bookContext, setBookContext)
    console.log(DownloadLinks)
    return (
        <div className="my-12 px-12 w-1/6 overflow-hidden sm:my-2 sm:px-2 md:w-1/3 lg:w-1/3 xl:my-2 xl:px-2 xl:w-1/4 ">
            <img className="flex  rounded-3xl  object-contain h-48 self-center w-full" src={`data:image/png;base64, ${Image}`} alt="" />
            <h2 className="text-1xl font-bold">{Title}</h2>
            <div className="text-lg text-gray-800">{Author}</div>
            <div className="flex text-2xl font-bold text-a">
                <button onClick={() => setBookContext(DownloadLinks["Cloudflare"])}>
                    Read
                </button>

            </div>
        </div>

    )
}

export default BookItem