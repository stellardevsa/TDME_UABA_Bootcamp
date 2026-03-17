import { useEffect, useState } from 'react';
import { StellarWalletsKit } from '@creit-tech/stellar-wallets-kit/sdk';
import { defaultModules } from '@creit-tech/stellar-wallets-kit/modules/utils';
import { Horizon } from '@stellar/stellar-sdk';
import WalletConnector from './components/WalletConnector';
import ProductList from './components/ProductList';
import './App.css';

const server = new Horizon.Server('https://horizon-testnet.stellar.org');

function App() {
  const [publicKey, setPublicKey] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    StellarWalletsKit.init({
      modules: defaultModules(),
    });
  }, []);

  const handleConnect = (address) => {
    setPublicKey(address);
    setStatus(`Connected: ${address.slice(0, 6)}...${address.slice(-4)}`);
  };

  return (
    <div className="app">
      <h1>Online Marketplace (Testnet)</h1>

      {!publicKey && (
        <WalletConnector onConnect={handleConnect} setStatus={setStatus} />
      )}

      {publicKey && (
        <div className="connected-wallet">
          Wallet Connected: {publicKey.slice(0, 6)}...{publicKey.slice(-4)}
        </div>
      )}

      <p>{status}</p>

      {publicKey && (
        <ProductList
          publicKey={publicKey}
          kit={StellarWalletsKit}
          server={server}
          setStatus={setStatus}
        />
      )}

      <p className="note">
        Need test XLM?{' '}
        <a href="https://friendbot.stellar.org" target="_blank">
          Fund with Friendbot
        </a>
      </p>
    </div>
  );
}

export default App;
