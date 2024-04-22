import { useEffect } from 'react';
import { useCall, useContractFunction } from '@usedapp/core';
import { utils } from 'ethers';
import { Button, Card, Typography } from '@mui/material';

const styles = {
    box: { minHeight: '100vh', backgroundColor: '#1b3864' },
    vh100: { minHeight: '100vh' },
    card: { borderRadius: 4, padding: 4, maxWidth: '550px', width: '100%' },
    alignCenter: { textAlign: 'center' },
};

function BookShelf({ contract }) {
    const books = useCall({ contract, method: 'getAvailableBooks', args: [] });
    const { state, send } = useContractFunction(contract, 'borrowBook');

    useEffect(() => {
        if (books && books.value) {
            console.log(books.value);
        }
    }, [books]);

    console.log(books);

    return(
        <>
            {books && books.value && (
                <Card sx={styles.card}>
                    <h1 style={styles.alignCenter}>Available Books</h1>
                    {books.value[0].map((book, index) => (
                        <div>
                            <Typography key={index}>{book.id.toNumber()} {book.title} </Typography>
                            {/* <Typography key={index}>{book.copies.toNumber()} copies</Typography> */}
                            {/* <Button onClick={() => send(utils.formatBytes32String(book.title), book.copies.toNumber())}>Borrow</Button> */}
                        </div>
                    ))}
                </Card>
            )}
        </>
    );

}

export default BookShelf;