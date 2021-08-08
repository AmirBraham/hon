
function BookItem(props) {

    return (
        <div class="container flex justify-center">
            <div class="max-w-sm py-32">
                <div class="bg-white relative shadow-lg hover:shadow-xl transition duration-500 rounded-lg">
                    <img class="rounded-t-lg" src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80" alt="" />
                    <div class="py-6 px-8 rounded-lg bg-white">
                        <h1 class="text-gray-700 font-bold text-2xl mb-3 hover:text-gray-900 hover:cursor-pointer">I'm supper dog for you.</h1>
                        <p class="text-gray-700 tracking-wide">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, labore. Ea debitis beatae sequi deleniti.</p>
                        <button class="mt-6 py-2 px-4 bg-yellow-400 text-gray-800 font-bold rounded-lg shadow-md hover:shadow-lg transition duration-300">Buy Now</button>
                    </div>
                    <div class="absolute top-2 right-2 py-2 px-4 bg-white rounded-lg">
                        <span class="text-md">$150</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookItem