import './App.css';
import Header from './components/Header';
import { Box } from '@mui/system';
import { Button, Grid } from '@mui/material';
import { useEthers } from '@usedapp/core';
import { Contract } from 'ethers';
import Library from './artifacts/contracts/Library.sol/Library.json';

const styles = {
    box: { minHeight: '100vh', backgroundColor: '#1b3864' },
    vh100: { minHeight: '100vh' },
    card: { borderRadius: 4, padding: 4, maxWidth: '550px', width: '100%' },
    alignCenter: { textAlign: 'center' },
};

const contractAddress = '0x97Ae7ef3b6eAF4dB9019025bc9C6e14F03585ea5';

function App() {
    const contract = new Contract(contractAddress, Library.abi);
    const { activateBrowserWallet, deactivate, account } = useEthers();

    // to handle the wallet toggle button click event to connect and disconnect the metamask wallet from the dapp
    const handleWalletConnection = () => {
        if (account) deactivate();
        else activateBrowserWallet();
    };

    return (
        <div className="App">
            <Header />
            <Box sx={styles.box}>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={styles.vh100}
                >
                    <Box position='absolute' top={8} right={16}>
                        <Button variant='contained' onClick={handleWalletConnection}>
                            {account
                            ? `Disconnect ${account.substring(0, 5)}...`
                            : 'Connect Wallet'}
                        </Button>
                    </Box>
                </Grid>
            </Box>
            <button className="btn btn-outline-dark m-1">Connect your MetaMask Wallet</button>
        </div>
    );
}

export default App;