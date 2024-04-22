// creater a bookshelf functional component which is used to retrieve data from smart contract and display in a table format with options to borrow the book, returnm it and also check copies avalibale
import React from 'react';

const BookShelf = () => {
    // state variable to store the books data
    const [books, setBooks] = React.useState([]);
    
    // retrieve the books data from the smart contract
    React.useEffect(() => {
        const getBooks = async () => {
            // get the smart contract instance
            const { contract } = window;
            // call the getBooks function from the smart contract
            const books = await contract.getBooks();
            // set the books data to the state variable
            setBooks(books);
        };
        // call the getBooks function
        getBooks();
    }, []);

    return (
        <div>
            <h1>BookShelf</h1>
        </div>
    );
}

export default BookShelf;