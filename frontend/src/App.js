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
    card: { borderRadius: 4, padding: 4, maxWidth: '700px', width: '100%'},
    alignCenter: { textAlign: 'center' },
};

const contractAddress = '0x2f109CCdC1d4Cf3A0BFc424C1db06C2A27F9aa8e';
const contractABI = Library.abi;

function App() {
    const { activateBrowserWallet, deactivate, account } = useEthers();
    const { library } = useEthers();
    const contract = new Contract(contractAddress, contractABI);

    // to handle the wallet toggle button click event to connect and disconnect the metamask wallet from the dapp
    const handleWalletConnection = () => {
        if (account) deactivate();
        else activateBrowserWallet();
    };
    
    const { state, send } = useContractFunction(contract, 'addBook');

    const [title, setTitle] = useState('');
    const [copies, setCopies] = useState(0);

    const handleAddBook = async (e) => {
        e.preventDefault();
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
                        <Button variant='contained' sx={{ width: '100%' }} endIcon={<img src={MetaMaskLogo} alt="logo" style={{ width: '200px', height: '60px' }} />} onClick={handleWalletConnection}>
                            {account
                            ? `Disconnect ${account.substring(0, 5)}...`
                            : 'Connect'}
                        </Button>
                    </Box>
                    <BookShelf contract={contract} />
                    <Card sx={{ ...styles.card, marginBottom: '16px' }}>
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
        </div>
    );
}

export default App;