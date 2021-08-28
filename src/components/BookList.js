import { useContext } from 'react'
import { BookContext } from '../contexts/BookContext'
import BookItem from './BookItem'

function BookList() {
    const { results } = useContext(BookContext)
    return (<div className="grid grid-cols-4 gap-4 justify-items-center">
        {
            results.map(book => <BookItem key={book["ID"]} book={book} />)
        }
    </div>)
}

export default BookList