import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data.products || []);
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Όλα τα Προϊόντα</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              width: '200px',
              textAlign: 'center',
            }}
          >
            <img src={product.image} alt={product.name} style={{ maxWidth: '100%' }} />
            <h4>{product.name}</h4>
            <p>{product.price}€</p>
            <Link to={`/product/${product._id}`}>Δες λεπτομέρειες</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
