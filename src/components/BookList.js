import { FlatList } from 'native-base'
import { useContext } from 'react'
import { BookContext } from '../contexts/BookContext'
import BookItem from './BookItem'
function BookList() {
    const { results } = useContext(BookContext)
    return (
        <FlatList
            data={results}
            renderItem={({ item }) => {
                return (
                    <BookItem key={item["ID"]} book={item} />
                )
            }}
            keyExtractor={(book) => book["ID"]}
        />)
}

export default BookList