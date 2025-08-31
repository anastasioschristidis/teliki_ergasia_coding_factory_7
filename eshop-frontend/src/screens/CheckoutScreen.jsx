import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CheckoutScreen() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(saved);
  }, []);

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  const handleOrder = async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo) {
      setMessage('Πρέπει να είστε συνδεδεμένοι για να κάνετε παραγγελία.');
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const orderData = {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item._id,
        })),
        totalPrice: Number(totalPrice),
      };

      await axios.post('/api/orders', orderData, config);
      setMessage('Η παραγγελία σας καταχωρήθηκε επιτυχώς!');

      localStorage.removeItem('cartItems');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error(error);
      setMessage('Σφάλμα κατά την καταχώρηση παραγγελίας.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Επιβεβαίωση Παραγγελίας</h2>
      {cartItems.length === 0 ? (
        <p>Το καλάθι σας είναι άδειο.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} style={{ marginBottom: '10px' }}>
              <p>
                {item.name} x {item.qty} = {item.qty * item.price}€
              </p>
            </div>
          ))}
          <h3>Σύνολο: {totalPrice}€</h3>
          <button onClick={handleOrder}>Καταχώρηση Παραγγελίας</button>
        </>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default CheckoutScreen;
