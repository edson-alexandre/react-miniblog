import "./App.css";
import { useAuthentication } from "./hooks/useAuthentication";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreatePost from "./pages/CreatePost/CreatePost";

function App() {
  const [user, setUser] = useState(undefined);
  const loadingUser = user === undefined;
  const { auth } = useAuthentication();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  const isAuthenticated = (element) => {
    return !user ? element : <Navigate to="/home" />;
  };

  const isNotAuthenticated = (element) => {
    return user ? element : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <AuthProvider value={{ user, setUser }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={isNotAuthenticated(<About />)} />
              <Route path="/login" element={isAuthenticated(<Login />)} />
              <Route path="/register" element={isAuthenticated(<Register />)} />
              <Route
                path="/dashboard"
                element={isNotAuthenticated(<Dashboard />)}
              />
              <Route
                path="/posts/create"
                element={isNotAuthenticated(<CreatePost />)}
              />
              <Route path="*" element={<Navigate to="home" />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
