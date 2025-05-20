// src/App.jsx
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // IMPORTADO Link
import { AppProvider } from "./contexto/contexto";

// Importación de Componentes
import Menu from "./components/menu";
import Listar from "./components/listar";
import Detalle from "./components/detalle";
import Aleatorio from "./components/aleatorios";
import Original from "./components/original";
import Favoritos from "./components/favoritos";
import Usuario from "./components/usuario";

import "./App.css";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app-container">
          <header className="app-header">
            <Menu />
          </header>

          <main className="app-main-content">
            <Routes>
              <Route path="/" element={<Listar />} />
              {/* Revertido a :name para que coincida con Detalle.jsx y tu versión funcional */}
              <Route path="/detalle/:name" element={<Detalle />} />
              <Route path="/original" element={<Original />} />
              <Route path="/aleatorio" element={<Aleatorio />} />
              <Route path="/favoritos" element={<Favoritos />} />
              <Route path="/usuario" element={<Usuario />} />
              <Route path="*" element={
                <div style={{ padding: "2rem", textAlign: "center" }}>
                  <h2>404 - Página No Encontrada</h2>
                  <p>La página que buscas no existe.</p>
                  <Link to="/">Volver al inicio</Link> {/* Ahora Link está importado */}
                </div>
              } />
            </Routes>
          </main>

          <footer className="app-footer">
            <p>&copy; {new Date().getFullYear()} Tu Aplicación Pokémon. Creado con React y la PokeAPI.</p>
          </footer>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;