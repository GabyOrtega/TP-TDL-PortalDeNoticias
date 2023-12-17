import React from 'react';
import './App.css';
import LoginPage from './pages/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { config } from './config/config';
import AuthRoute from './components/AuthRoute';
import HomePage from './pages/home-page';

initializeApp(config.firebaseConfig)


export interface IApplicationProps {}

const Application: React.FC<IApplicationProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/" 
          element={
            <AuthRoute>
              <HomePage />
            </AuthRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Application;
