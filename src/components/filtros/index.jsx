// src/Componentes/Filtros/index.jsx

// Definir los tipos fuera del componente si son constantes y no dependen de props o estado
// Esto evita que el array se recree en cada render.
const TIPOS_POKEMON = [
  "All", "normal", "fighting", "flying", "poison", "ground", "rock",
  "bug", "ghost", "steel", "fire", "water", "grass", "electric",
  "psychic", "ice", "dragon", "dark", "fairy"
  // "stellar", "shadow", "unknown" son tipos más recientes o especiales,
  // asegúrate que la PokeAPI los soporte bien en el endpoint de /type si los incluyes.
  // Por ahora, los comento para enfocarnos en los más comunes. Si los necesitas, descomenta.
];

function Filtro({ onTipoChange, tipoSeleccionadoActual }) {
  return (
    <nav className="c-filtro" aria-label="Filtros de tipo Pokémon">
      <ul className="c-filtro-lista">
        {TIPOS_POKEMON.map((tipo) => (
          <li key={tipo} className="c-filtro-item">
            <button
              className={`c-filtro-boton ${tipoSeleccionadoActual === tipo ? 'seleccionado' : ''}`}
              onClick={() => onTipoChange(tipo)}
              aria-pressed={tipoSeleccionadoActual === tipo} // Para accesibilidad
            >
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)} {/* Capitalizar para mostrar */}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Filtro;