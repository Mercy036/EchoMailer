import { useState } from 'react'
import './App.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignIn from "./pages/sign_in"
import Dashboard from './pages/dashboard';
import Compose from "./pages/compose"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/compose" element={<Compose />} />
    </Routes>    
    </BrowserRouter>
  );
}

export default App