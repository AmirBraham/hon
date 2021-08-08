
function BookItem(props) {

    return (
        <div className="container flex justify-center">
            <div className="max-w-sm py-32">
                <div className="bg-white relative shadow-lg hover:shadow-xl transition duration-500 rounded-lg">
                    <img className="rounded-t-lg" src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80" alt="" />
                    <div className="py-6 px-8 rounded-lg bg-white">
                        <h1 className="text-gray-700 font-bold text-2xl mb-3 hover:text-gray-900 hover:cursor-pointer">I'm supper dog for you.</h1>
                        <p className="text-gray-700 tracking-wide">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, labore. Ea debitis beatae sequi deleniti.</p>
                        <button className="mt-6 py-2 px-4 bg-yellow-400 text-gray-800 font-bold rounded-lg shadow-md hover:shadow-lg transition duration-300">Buy Now</button>
                    </div>
                    <div className="absolute top-2 right-2 py-2 px-4 bg-white rounded-lg">
                        <span className="text-md">$150</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookItem