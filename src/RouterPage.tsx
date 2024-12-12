import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function RouterPage() {
  return (
    <BrowserRouter>
        <Routes> 
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/login" element={<LoginPage/>}></Route>
            <Route path="/register" element={<RegisterPage/>}> </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default RouterPage;