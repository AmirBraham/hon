import React, { useState, useContext, useRef } from 'react'
import { BookContext } from '../contexts/BookContext'
function Search() {
    const { search, setSearch, setLoading, setError, setResults } = useContext(BookContext)
    const i = useRef(0)
    const SEARCH_OPTIONS = ["Title", "Author", "ISBN"]
    const PLACEHOLDERS = ["Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future", "Ashlee Vance", "9780062301253"]
    const [searchBy, setSearchBy] = useState(SEARCH_OPTIONS[0])

    const searchForBook = (searchBy = "Title") => {

        setLoading(true)
        setError(false)
        fetch(`https://hon-app-backend.herokuapp.com//${search}?search_by=${searchBy}`).then(res => res.json()).then(({ message }) => {
            setResults(message)
            setLoading(false)
            if (message.length === 0) {
                setError("No book found. Please try again ")
            }
        })
            .catch(err => {
                console.log(err)
                setLoading(false)
                setError(true)
            })

    }
    return (
        <div className="flex flex-col items-center">
            <div className="flex px-2 py-4 w-5/6 bg-gray-100  rounded-lg">

                <input onChange={e => setSearch(e.target.value)} className="bg-gray-100 outline-none w-90" type="text" placeholder={PLACEHOLDERS[i.current]} value={search} />
            </div>
            <div className="flex my-4 rounded-lg text-gray-500 font-semibold cursor-pointer">
                <span onClick={() => { i.current = (SEARCH_OPTIONS.indexOf(searchBy) + 1) % SEARCH_OPTIONS.length; setSearchBy(SEARCH_OPTIONS[i.current]) }}>Search by <b>{searchBy}</b></span>
            </div>
            <div className="bg-green-400 w-5/12 text-center p-2  text-white font-semibold rounded-lg" onClick={() => searchForBook(searchBy)}>
                <span>Search</span>
            </div>
        </div>
    )
}

export default Search