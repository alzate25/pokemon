import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Aleatorio from './components/aleatorios'
import Detalle from './components/detalle'
import Favoritos from './components/favoritos'
import Listar from './components/listar'
import Menu from './components/menu';
import Original from './components/original'
import Usuario from './components/usuario'

import './App.css'

function App() {

  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/components/aleatorios" element={<Aleatorio />} />
        <Route path="/components/detalle" element={<Detalle />} />
        <Route path="/components/favoritos" element={<Favoritos />} />
        <Route path="/components/listar" element={<Listar />} />
        <Route path="/components/original" element={<Original />} />
        <Route path="/components/usuario" element={<Usuario />} />
      </Routes>
    </Router>

  )
}

export default App
