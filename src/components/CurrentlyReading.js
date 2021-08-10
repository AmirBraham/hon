import React, { useEffect, useState } from "react"
import BookItem from './BookItem'
function CurrentlyReading() {
    const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([])
    useEffect(() => {
        if (window.localStorage.getItem("hon")) {
            const savedBooks = JSON.parse(window.localStorage.getItem("hon"))
            setCurrentlyReadingBooks(Object.values(savedBooks))

        }
    }, [])
    const removeBookFromSaved = (ID) => {
        let savedBooks = JSON.parse(window.localStorage.getItem("hon"))
        delete savedBooks[ID]
        window.localStorage.setItem("hon", JSON.stringify(savedBooks))
        setCurrentlyReadingBooks(Object.values(savedBooks))
    }
    return (<div className=" m-auto  w-3/6 items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl ">
        <p className="flex  py-6 px-4 rounded-lg text-gray-500 font-semibold"   >Currently Reading : </p>
        <div className="grid grid-cols-2 gap-3 justify-items-center">
            {
                currentlyReadingBooks.map(book => <BookItem removeBookFromSaved={removeBookFromSaved} key={book["ID"]} book={book} />)
            }
        </div>
    </div>)
}

export default CurrentlyReading