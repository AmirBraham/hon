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
        <div className="flex justify-center items-center px-20">
            <div className="flex items-center p-6 space-x-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">
                <div className="flex bg-gray-100 p-4 space-x-4 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input onChange={e => setSearch(e.target.value)} className="bg-gray-100 outline-none w-90" type="text" placeholder={PLACEHOLDERS[i.current]} value={search} />
                </div>
                <div className="flex py-3 px-4 rounded-lg text-gray-500 font-semibold cursor-pointer">
                    <span onClick={() => { i.current = (SEARCH_OPTIONS.indexOf(searchBy) + 1) % SEARCH_OPTIONS.length; setSearchBy(SEARCH_OPTIONS[i.current]) }}>Search by <b>{searchBy}</b></span>
                </div>
                <div className="bg-green-400 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer" onClick={() => searchForBook(searchBy)}>
                    <span>Search</span>
                </div>
            </div>

        </div>)
}

export default Search