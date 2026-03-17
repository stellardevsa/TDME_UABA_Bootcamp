
import Product from './Product';

const products = [
    {
        id: 1,
        name: 'Stellar T-Shirt',
        price: '5',
        seller: 'GBQSGU2PZNNXOJBB5ROYMHIEPLGCZUA7MCL7BQYVF3STJ3OOYDCAXMQK',
    },
    {
        id: 2,
        name: 'USDC Mug',
        price: '10',
        seller: 'GBQSGU2PZNNXOJBB5ROYMHIEPLGCZUA7MCL7BQYVF3STJ3OOYDCAXMQK',
    },
];

function ProductList({ publicKey, kit, server, setStatus }) {
    return (
        <div className="product-list">
            <h2>Available Products</h2>

            {products.map((product) => (
                <Product
                    key={product.id}
                    product={product}
                    publicKey={publicKey}
                    kit={kit}
                    server={server}
                    setStatus={setStatus}
                />
            ))}
        </div>
    );
}

export default ProductList;
