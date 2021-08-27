import React, { useState, useContext, useRef } from 'react'
import { BookContext } from '../contexts/BookContext'
import { Input, Button, Text, Flex, Spacer } from "native-base"


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


        <Flex direction="column" >
            <Input
                type={"text"}
                InputRightElement={
                    <Button ml={1} roundedLeft={0} roundedRight="md" onPress={() => searchForBook(searchBy)}>
                        search
                    </Button>
                }
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={PLACEHOLDERS[i.current]}
            />
            <Spacer />

            <Text fontSize="sm" onClick={() => { i.current = (SEARCH_OPTIONS.indexOf(searchBy) + 1) % SEARCH_OPTIONS.length; setSearchBy(SEARCH_OPTIONS[i.current]) }}>Search by <b>{searchBy}</b></Text>

        </Flex>
    )



}

export default Search