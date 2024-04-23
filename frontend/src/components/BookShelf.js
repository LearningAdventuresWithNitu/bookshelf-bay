import { useEffect, useState } from 'react';
import { useCall, useContractFunction } from '@usedapp/core';
import { utils } from 'ethers';
import { Button, Card, Typography, Tooltip } from '@mui/material';
import { margin } from '@mui/system';
import BookDetails from './BookDetails';

const styles = {
    box: { minHeight: '100vh', backgroundColor: '#1b3864' },
    vh100: { minHeight: '100vh' },
    card: { borderRadius: 4, padding: 4, maxWidth: '800px', width: '100%'},
    alignCenter: { textAlign: 'center' },
};

function BookShelf({ contract }) {
    const books = useCall({ contract, method: 'getAvailableBooks', args: [] });
    const { state: stateBorrow, send: sendBorrow } = useContractFunction(contract, 'borrowBook');
    const { state: stateReturn, send: sendReturn } = useContractFunction(contract, 'returnBook');
    const [borrowedBooks, setBorrowedBooks] = useState([]);

    useEffect(() => {
        if (books && books.value) {
            console.log(books.value);
        }
    }, [books]);

    useEffect(() => {
        if (stateReturn.status === 'Success') {
            // Book returned successfully, update borrowedBooks state
            const bookId = stateReturn.events[0].args[0];
            setBorrowedBooks(borrowedBooks.filter(id => id !== bookId));
        }
    }, [stateReturn]);

    console.log(books);
    console.log(borrowedBooks);

    const handleBorrowBook = async (bookId) => {
        try {
            if (borrowedBooks.includes(bookId)) {
                alert('You already have this book borrowed.');
            } else {
                await sendBorrow(bookId);
                setBorrowedBooks([...borrowedBooks, bookId]);
            }
        } catch (error) {
            console.error('Error borrowing book:', error);
        }
    };
    
    const handleReturnBook = async (bookId) => {
        try {
            await sendReturn(bookId);
        } catch (error) {
            console.error('Error returning book:', error);
        }
    }

    return(
        <>
            {books && books.value && (
                <Card sx={{ ...styles.card, marginBottom: '8px' }}>
                    <h1 style={styles.alignCenter}>Available Books</h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
                    {books.value[0].map((book, index) => (
                        <Card key={index} sx={{ width: '200px', padding: '16px', textAlign: 'center' }}>
                            <Typography>Id: {book.id.toNumber()} </Typography>
                            <BookDetails contract={contract} bookId={book.id.toNumber()} />
                            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '8px' }}>
                                <Button onClick={() => handleBorrowBook(book.id.toNumber())}>Borrow</Button>
                                <Tooltip title="You have not borrowed this book to initiate return" arrow>
                                    <span>
                                        <Button 
                                            onClick={() => handleReturnBook(book.id.toNumber())} 
                                            disabled={!borrowedBooks.includes(book.id.toNumber())}
                                        >
                                        Return
                                        </Button>
                                    </span>
                                </Tooltip>
                            </div>
                        </Card>
                    ))}
                    </div>
                </Card>
            )}
        </>
    );

}

export default BookShelf;