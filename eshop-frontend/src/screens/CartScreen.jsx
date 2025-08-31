import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CartScreen() {
  const { id: productId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const qty = Number(searchParams.get('qty')) || 1;
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchAndAddToCart = async () => {
      const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];

      if (productId) {
        const { data } = await axios.get(`/api/products/${productId}`);
        const item = {
          _id: data._id,
          name: data.name,
          image: data.image,
          price: data.price,
          qty,
        };

        const exists = storedCart.find((x) => x._id === item._id);
        const updatedCart = exists
          ? storedCart.map((x) =>
              x._id === item._id ? { ...x, qty: x.qty + qty } : x
            )
          : [...storedCart, item];

        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
      } else {
        setCartItems(storedCart);
      }
    };

    fetchAndAddToCart();
  }, [productId, qty]);

  const updateQtyHandler = (id, newQty) => {
    const updated = cartItems.map((item) =>
      item._id === id ? { ...item, qty: Number(newQty) } : item
    );
    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
  };

  const removeHandler = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  const goToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🛒 Καλάθι Αγορών</h2>
      {cartItems.length === 0 ? (
        <p>Το καλάθι σας είναι άδειο.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}
            >
              <img src={item.image} alt={item.name} width="100" />
              <p>
                <strong>{item.name}</strong>
              </p>
              <p>Τιμή: {item.price}€</p>

              <label>Ποσότητα:</label>{' '}
              <select
                value={item.qty}
                onChange={(e) => updateQtyHandler(item._id, e.target.value)}
              >
                {[...Array(10).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>

              <br />
              <button onClick={() => removeHandler(item._id)}>Αφαίρεση</button>
            </div>
          ))}

          <hr />
          <h3>Σύνολο Προϊόντων: {totalItems}</h3>
          <h3>Συνολικό Ποσό: {totalPrice}€</h3>
          <button onClick={goToCheckout}>Συνέχεια στην Παραγγελία</button>
        </>
      )}
    </div>
  );
}

export default CartScreen;
