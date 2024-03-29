import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookContext } from '../contexts/BookContext'
import { LazyLoadImage } from 'react-lazy-load-image-component';

function BookItem(props) {
    const { setBook, results } = useContext(BookContext)
    const { Author, ISBN, Language, Image, Title, Size, Pages, Mirror_1, ID } = props.book
    const [image, setImage] = useState("")
    const getDownloadLink = (callback) => {
        if (props.book.downloadLink) {
            callback(props.book)
        } else {

            fetch(`https://hon-app-backend.herokuapp.com//d/?url=${Mirror_1}`).then(res => res.json()).then(({ message }) => {
                callback({ ...props.book, downloadLink: message["GET"] })
            }).catch(err => console.log(err))
        }
    }



    return (


        <div className="flex  w-full flex-col   object-contain  self-center text-center ">
            <LazyLoadImage
                className="w-32 m-auto shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-200  rounded-3xl"

                src={`${Image}`} // use normal <img> attributes as props
            />

            <h2 className="text-sm font-bold py-2">{Title}</h2>
            <div className="text-lg text-gray-800">{Author}</div>
            <button onClick={() => getDownloadLink(setBook)}>
                <Link to="/read/">
                    Read
                </Link>
            </button>
            {results.length === 0 && <p onClick={() => {
                if (props.removeBookFromSaved) {
                    props.removeBookFromSaved(ID)
                }
            }}>Remove from list</p>}


        </div>

    )
}

export default BookItem