import { useState } from 'react'

function Search() {
    const SEARCH_OPTIONS = ["Title", "Author", "ISBN"]
    const [searchBy, setSearchBy] = useState(SEARCH_OPTIONS[0])
    return (
        <div className="flex justify-center items-center px-20">


            <div className="flex items-center p-6 space-x-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">
                <div className="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input className="bg-gray-100 outline-none" type="text" placeholder="Article name or keyword..." />
                </div>
                <div className="flex py-3 px-4 rounded-lg text-gray-500 font-semibold cursor-pointer">
                    <span onClick={() => setSearchBy(SEARCH_OPTIONS[(SEARCH_OPTIONS.indexOf(searchBy) + 1) % SEARCH_OPTIONS.length])}>Search by <b>{searchBy}</b></span>
                </div>
                <div className="bg-green-400 py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer">
                    <span>Search</span>
                </div>
            </div>

        </div>)
}

export default Search