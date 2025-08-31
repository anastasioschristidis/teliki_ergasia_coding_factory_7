import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log('API URL:', apiUrl);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${apiUrl}/api/users/login`, {
        email,
        password,
      });

      console.log('Login success:', data);
      onLogin(data);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError('Λάθος στοιχεία σύνδεσης');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Σύνδεση Χρήστη</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={submitHandler}>
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
        <button type="submit">Σύνδεση</button>
      </form>
    </div>
  );
}

export default LoginScreen;
