import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import LoginScreen from './screens/LoginScreen';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterScreen from './screens/RegisterScreen';
import { useEffect, useState } from 'react';

function App() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userInfo'));
    setUserInfo(storedUser);
  }, []);

  // Χρησιμοποιείται στο Login & Register
  const handleLoginOrRegister = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUserInfo(data);
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
  };

  return (
    <Router>
      <Header userInfo={userInfo} logoutHandler={handleLogout} />
      <Routes>
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/cart/:id" element={<CartScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/" element={<HomeScreen />} />
        <Route
          path="/checkout"
          element={<ProtectedRoute><CheckoutScreen /></ProtectedRoute>}
        />
        <Route path="/login" element={<LoginScreen onLogin={handleLoginOrRegister} />} />
        <Route path="/register" element={<RegisterScreen onRegister={handleLoginOrRegister} />} />
      </Routes>
    </Router>
  );
}

export default App;
