import './App.css';
import Header from './components/Header';
import { useState } from 'react';
import { Box } from '@mui/system';
import { Button, Grid, Card, TextField } from '@mui/material';
import { useEthers, useContractFunction } from '@usedapp/core';
import { Contract } from 'ethers';
import Library from './artifacts/contracts/Library.sol/Library.json';
import MetaMaskLogo from './assets/SVG_MetaMask_Horizontal_Color.svg';
import BookShelf from './components/BookShelf';

const styles = {
    box: { minHeight: '100vh', backgroundColor: '#1b3864' },
    vh100: { minHeight: '100vh' },
    card: { borderRadius: 4, padding: 4, maxWidth: '550px', width: '100%' },
    alignCenter: { textAlign: 'center' },
};

const contractAddress = '0x97Ae7ef3b6eAF4dB9019025bc9C6e14F03585ea5';

function App() {
    const { activateBrowserWallet, deactivate, account } = useEthers();
    const contract = new Contract(contractAddress, Library.abi);

    const { state, send } = useContractFunction(contract, 'addBook');

    // to handle the wallet toggle button click event to connect and disconnect the metamask wallet from the dapp
    const handleWalletConnection = () => {
        if (account) deactivate();
        else activateBrowserWallet();
    };

    const [title, setTitle] = useState('');
    const [copies, setCopies] = useState(0);

    const handleAddBook = async () => {
        send(title, copies);
        setTitle('');
        setCopies(0);
    };

    return (
        <div className="App">
            <Header />
            <Box sx={styles.box}>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    sx={styles.vh100}
                >
                    <Box position='relative' sx={styles.card}>
                        <Button variant='contained' sx={{ width: '100%' }} endIcon={<img src={MetaMaskLogo} alt="Image" style={{ width: '200px', height: '60px' }} />} onClick={handleWalletConnection}>
                            {account
                            ? `Disconnect ${account.substring(0, 5)}...`
                            : 'Connect'}
                        </Button>
                    </Box>
                    <Card sx={styles.card}>
                        <h1 style={styles.alignCenter}>Add Book</h1>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Title"
                                    variant="outlined"
                                    fullWidth
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Number of Copies"
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    value={copies}
                                    onChange={(e) => setCopies(parseInt(e.target.value))}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" onClick={handleAddBook}>
                                    Add Book
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Box>
            <button className="btn btn-outline-dark m-1">Connect your MetaMask Wallet</button>
        </div>
    );
}

export default App;