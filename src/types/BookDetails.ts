import Book from "./book"
import Highlight from "./highlight"
import Page from "./page"

type BookDetails =  {
    link:string,
    book:Book,
    currentLocation:Page | null,
    highlights:Highlight[]
}

export default BookDetails