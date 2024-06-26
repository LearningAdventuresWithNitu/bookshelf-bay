import { useCall, useContractFunction } from '@usedapp/core';
import { Typography, Card } from '@mui/material';

function BookDetails({ contract, bookId }) {
    const bookDetails = useCall({ contract, method: 'getBookDetails', args: [bookId] });

    if (!bookDetails || !bookDetails.value) {
        return null;
    }

    const [title, copies, borrowers] = bookDetails.value;

    console.log(bookDetails.value);

    return (
        <>
            <Typography>Title: {title}</Typography>
            <Typography>Total Copies: {copies.toNumber()}</Typography>
            <Typography>Available Copies: {copies.toNumber() - borrowers.length}</Typography>
        </>
    );
}

export default BookDetails;