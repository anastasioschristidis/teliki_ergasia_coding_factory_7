import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterScreen({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log('API URL:', apiUrl);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${apiUrl}/api/users/register`, {
        name,
        email,
        password,
      });

      console.log('Register success:', data);
      onRegister(data);
      navigate('/');
    } catch (err) {
      console.error('Register error:', err);
      setError('Η εγγραφή απέτυχε. Το email μπορεί να χρησιμοποιείται ήδη.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Εγγραφή Χρήστη</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={submitHandler}>
        <div>
          <label>Όνομα:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Κωδικός:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit">Εγγραφή</button>
      </form>
    </div>
  );
}

export default RegisterScreen;
