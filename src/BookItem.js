import React, { useState } from 'react'

function BookItem({ book }) {
    const [src, setSrc] = useState("")
    const { Author, ISBN, Language, Image, Title, Size, Pages } = book
    return (
        <div className="min-h-screen  py-6 flex flex-col justify-center sm:py-12 container mx-auto shadow-lg rounded-lg max-w-md hover:shadow-2xl transition duration-300 ">

            <div className="py-3 sm:max-w-xl sm:mx-auto">
                <div className=" shadow-lg border-gray-100 max-h-80	 border sm:rounded-3xl p-8 flex space-x-8">
                    <div className="h-48 overflow-visible w-1/2">
                        <img className="rounded-3xl shadow-lg" src={`data:image/png;base64, ${Image}`} alt="" />

                    </div>
                    <div className="flex flex-col w-1/2 space-y-4">
                        <div className="flex justify-between items-start">
                            <h2 className="text-1xl font-bold">{Title}</h2>
                            <div className="bg-yellow-400 font-bold rounded-xl p-2">7.2</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-400">Author</div>
                            <div className="text-lg text-gray-800">{Author}</div>
                        </div>
                        <div className="flex text-2xl font-bold text-a">Read</div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default BookItem