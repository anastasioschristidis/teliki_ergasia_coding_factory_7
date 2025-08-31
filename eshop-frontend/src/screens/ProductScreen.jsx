import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

function ProductScreen() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // Από localStorage τον πραγματικό χρήστη
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const fetchProduct = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.error('Σφάλμα κατά τη λήψη του προϊόντος:', error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const submitReviewHandler = async (e) => {
    e.preventDefault();

    if (!userInfo) {
      alert('Πρέπει να συνδεθείτε για να υποβάλετε κριτική.');
      return;
    }

    try {
      await axios.post(
        `/api/products/${id}/reviews`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      alert('Η κριτική υποβλήθηκε!');
      setRating(0);
      setComment('');
      fetchProduct();
    } catch (error) {
      alert(error.response?.data?.message || 'Σφάλμα κατά την αποστολή');
    }
  };

  if (loading) return <p>Φόρτωση...</p>;
  if (!product) return <p>Το προϊόν δεν βρέθηκε.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <img
        src={product.image}
        alt={product.name}
        style={{ maxWidth: '300px', marginBottom: '20px', border: '1px solid #ccc' }}
      />

      <h1>{product.name}</h1>

      <button
        onClick={() => {
          window.location.href = `/cart/${product._id}?qty=1`;
        }}
      >
        Προσθήκη στο καλάθι
      </button>

      <p>{product.description}</p>

      <hr />
      <h3>Κριτικές:</h3>
      {product.reviews && product.reviews.length > 0 ? (
        product.reviews.map((review) => (
          <div
            key={review._id}
            style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}
          >
            <strong>{review.name}</strong> – Βαθμολογία: {review.rating}/5
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>Δεν υπάρχουν ακόμα κριτικές.</p>
      )}

      <hr />
      {userInfo ? (
        <form onSubmit={submitReviewHandler}>
          <h4>Υποβολή Κριτικής</h4>

          <div>
            <label>Βαθμολογία:</label>
            <select value={rating} onChange={(e) => setRating(e.target.value)} required>
              <option value="">Επιλέξτε...</option>
              <option value="1">1 - Κακή</option>
              <option value="2">2 - Μέτρια</option>
              <option value="3">3 - Καλή</option>
              <option value="4">4 - Πολύ καλή</option>
              <option value="5">5 - Εξαιρετική</option>
            </select>
          </div>

          <div>
            <label>Σχόλιο:</label>
            <textarea
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit">Αποστολή</button>
        </form>
      ) : (
        <p>Παρακαλώ <a href="/login">συνδεθείτε</a> για να αφήσετε κριτική.</p>
      )}
    </div>
  );
}

export default ProductScreen;
