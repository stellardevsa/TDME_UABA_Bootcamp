import {
    TransactionBuilder,
    Operation,
    Networks,
    BASE_FEE,
    Transaction,
    Asset,
} from '@stellar/stellar-sdk';

function Product({ product, publicKey, kit, server, setStatus }) {
    const handleBuy = async () => {
        try {
            setStatus(`Preparing payment for ${product.name}...`);

            const sourceAccount = await server.loadAccount(publicKey);

            const usdcAsset = new Asset(
                "USDC",
                "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5"
            );

            const tx = new TransactionBuilder(sourceAccount, {
                fee: BASE_FEE,
                networkPassphrase: Networks.TESTNET,
            })
                .addOperation(
                    Operation.payment({
                        destination: product.seller,
                        asset: usdcAsset,
                        amount: product.price,
                    })
                )
                .setTimeout(30)
                .build();

            setStatus('Waiting for wallet signature...');

            const { signedTxXdr } = await kit.signTransaction(tx.toXDR(), {
                networkPassphrase: Networks.TESTNET,
                address: publicKey,
            });

            const signedTx = new Transaction(signedTxXdr, Networks.TESTNET);

            setStatus('Submitting transaction to Stellar testnet...');

            const result = await server.submitTransaction(signedTx);

            setStatus(
                `Payment successful for ${product.name}. Tx: ${result.hash.slice(0, 12)}...`
            );
        } catch (error) {
            console.error('Purchase failed:', error);

            const errorMessage =
                error?.response?.data?.extras?.result_codes
                    ? JSON.stringify(error.response.data.extras.result_codes)
                    : error?.message || 'Unknown error';

            setStatus(`Purchase failed: ${errorMessage}`);
        }
    };

    return (
        <div className="product-card">
            <h3>{product.name}</h3>
            <p>Price: {product.price} USDC </p>
            <p>
                Seller: {product.seller.slice(0, 6)}...{product.seller.slice(-4)}
            </p>
            <button onClick={handleBuy}>Buy Now</button>
        </div>
    );
}

export default Product;
