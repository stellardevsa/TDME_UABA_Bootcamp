

import { StellarWalletsKit } from '@creit-tech/stellar-wallets-kit/sdk';

function WalletConnector({ onConnect, setStatus }) {
    const handleConnectWallet = async () => {
        try {
            setStatus('Opening wallet selector...');

            const { address } = await StellarWalletsKit.authModal();

            onConnect(address);
        } catch (error) {
            console.error('Wallet connection failed:', error);
            setStatus('Wallet connection was cancelled or failed.');
        }
    };

    return (
        <div className="wallet-connector">
            <h2>Connect Your Wallet</h2>
            <button onClick={handleConnectWallet}>Connect Wallet</button>
        </div>
    );
}

export default WalletConnector;
