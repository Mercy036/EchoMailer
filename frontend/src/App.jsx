import { useState } from 'react'
import './App.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignIn from "./pages/sign_in"
import Dashboard from './pages/dashboard';
import Compose from "./pages/compose"
import Emails from "./pages/emails"
import SignUp from './pages/sign_up';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signin' element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/compose" element={<Compose />} />
      <Route path="/emails" element={<Emails />} />
      <Route path="/signup" element={<SignUp/>} />
    </Routes>    
    </BrowserRouter>
  );
}

export default App