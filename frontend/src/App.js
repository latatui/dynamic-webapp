import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import WritePost from './pages/WritePost';
import PostDetails from './pages/PostDetails';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/auth/check', { withCredentials: true })
      .then(response => setUser(response.data.user))
      .catch(() => setUser(null));
  }, []);

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    axios.post('http://localhost:3001/auth/logout', {}, { withCredentials: true })
      .then(() => setUser(null));
  };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/write" element={<WritePost user={user} />} />
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
