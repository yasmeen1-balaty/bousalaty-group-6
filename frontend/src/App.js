import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Quiz from './pages/explore-interests/Quiz'
import HomePage from './pages/home-page/HomePage';
import ChatBot from './pages/home-page/ChatBot';
import AuthPage from './pages/home-page/auth/AuthPage';
import Navbar from './pages/Navbar';
import SuggestMajors from './pages/suggest-majors/SuggestMajors';
import About from './pages/suggest-majors/About';
import MajorDetails from './pages/explore-major/Major';
import { Dashboard } from './pages/student-dashboard/dashboard';
import { useState, useEffect } from 'react';

     
function App() {
  const [items, setItems] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/faculties/1") // this is only to cxheck thaat we are connected to the data base
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setDataIsLoaded(true);
      });
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  function login(userData) {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  }

  if (!dataIsLoaded) return <div>Loading...</div>;

  return (
    <>
      <Navbar user={user} logout={logout} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage login={login} />} />
        <Route path="/majors/:majorID" element={<MajorDetails />} />
        <Route path="/suggestions" element={<SuggestMajors />} />
        <Route path="/about" element={<About />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      <ChatBot />
    </>
  );
}
export default App;
