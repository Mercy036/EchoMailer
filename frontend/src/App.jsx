import { useState } from 'react'
import './App.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignIn from "./pages/sign_in"
import Dashboard from './pages/dashboard';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>    
    </BrowserRouter>
  );
}

export default App