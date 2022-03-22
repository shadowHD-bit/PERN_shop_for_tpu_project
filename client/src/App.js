import React from 'react'
import {Route, BrowserRouter, Routes, } from 'react-router-dom'
import AppRouter from './components/AppRouter';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
