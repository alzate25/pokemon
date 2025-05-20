// src/Componentes/Menu/index.jsx
import { Link, NavLink } from 'react-router-dom'; // Importar NavLink también para estilos activos
import "./style.css"; // Asegúrate de que este archivo exista en la misma carpeta (src/Componentes/Menu/style.css)

function Menu() {
  return (
    <nav className="c-menu">
      <ul className="c-menu-lista">
        <li className="c-menu-item">
          {/* Usar NavLink permite aplicar estilos al enlace activo automáticamente */}
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? "c-menu-enlace c-menu-enlace-activo" : "c-menu-enlace"}
          >
            Listar Pokémon
          </NavLink>
        </li>
        <li className="c-menu-item">
          <NavLink
            to="/original"
            className={({ isActive }) => isActive ? "c-menu-enlace c-menu-enlace-activo" : "c-menu-enlace"}
          >
            Pokédex Original
          </NavLink>
        </li>
        <li className="c-menu-item">
          <NavLink
            to="/aleatorio"
            className={({ isActive }) => isActive ? "c-menu-enlace c-menu-enlace-activo" : "c-menu-enlace"}
          >
            Aleatorios
          </NavLink>
        </li>
        <li className="c-menu-item">
          <NavLink
            to="/favoritos"
            className={({ isActive }) => isActive ? "c-menu-enlace c-menu-enlace-activo" : "c-menu-enlace"}
          >
            Favoritos
          </NavLink>
        </li>
        <li className="c-menu-item">
          <NavLink
            to="/usuario"
            className={({ isActive }) => isActive ? "c-menu-enlace c-menu-enlace-activo" : "c-menu-enlace"}
          >
            Usuario
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;