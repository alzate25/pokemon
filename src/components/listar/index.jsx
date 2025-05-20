// src/Componentes/Listar/index.jsx
import { useState, useContext, useEffect } from "react"; // useEffect puede ser necesario para lógica local o reacciones
import { AppContext } from '../../contexto/contexto'; import { useNavigate } from "react-router-dom";
import Filtro from "../filtros"; // Asumiendo que Filtros está en src/Componentes/Filtros/index.jsx

function Listar() {
  // Consumir del Contexto: data, tipoSeleccionado, y la función para cambiar el tipo
  const { data: pokemonDataFromContext, tipoSeleccionado, setTipoSeleccionado, totalPokes } = useContext(AppContext);
  const [busqueda, setBusqueda] = useState(''); // Estado local para el término de búsqueda
  const navigate = useNavigate();

  // El useEffect para cargar datos ya no es necesario aquí,
  // ya que AppContext se encarga de ello cuando tipoSeleccionado cambia.

  const handleTipoChange = (nuevoTipo) => {
    setTipoSeleccionado(nuevoTipo); // Actualiza el tipo en el contexto global
    setBusqueda(''); // Opcional: Limpiar la búsqueda al cambiar de tipo
  };

  // Lógica de filtrado por búsqueda (aplicada sobre los datos del contexto)
  let resultadosFiltrados = pokemonDataFromContext || []; // Empezar con los datos del contexto (o un array vacío si no hay)

  if (busqueda.trim() !== '') {
    const busquedaLower = busqueda.toLowerCase().trim();
    resultadosFiltrados = resultadosFiltrados.filter(pokemon => {
      if (!pokemon) return false; // Guarda por si hay algún elemento null/undefined en la data

      // Búsqueda por nombre
      if (pokemon.name && pokemon.name.toLowerCase().includes(busquedaLower)) {
        return true;
      }
      // Búsqueda por ID (si la búsqueda es un número)
      // El ID se extrae de la URL. Asegurarse que pokemon.url exista.
      if (!isNaN(parseInt(busquedaLower)) && pokemon.url) {
        const pokemonId = pokemon.url.split("/")[6];
        return pokemonId === busquedaLower;
      }
      return false;
    });
  }
  
  // Considerar un estado de carga si pokemonDataFromContext está vacío y no es el resultado de un filtro vacío.
  // Por ahora, si está vacío, mostrará "No se encontraron Pokémon".

  return (
    <div className="c-listar-container">
      <div className="c-listar-controles">
        <input
          type="text"
          placeholder="Buscar Pokémon por nombre o ID"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="c-buscador"
          aria-label="Buscar Pokémon"
        />
        <Filtro
          onTipoChange={handleTipoChange}
          tipoSeleccionadoActual={tipoSeleccionado}
        />
      </div>

      {resultadosFiltrados.length > 0 ? (
        <section className='c-lista c-lista-grid'>
          {resultadosFiltrados.map((pokemon) => {
            if (!pokemon || !pokemon.url || !pokemon.name) {
                // Esto puede ocurrir si la data de la API no es consistente o si
                // la data del tipo filtrado (de json.pokemon.map(p => p.pokemon))
                // tiene elementos incompletos.
                console.warn("Pokémon con datos incompletos en Listar:", pokemon);
                return null; 
            }
            const pokemonId = pokemon.url.split("/")[6];
            return (
              <div
                className='c-lista-pokemon'
                onClick={() => navigate(`/detalle/${pokemon.name.toLowerCase()}`)} // Navegar por nombre (como espera Detalle.jsx)
                key={pokemonId || pokemon.name} // Usar ID o nombre como key
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
                  alt={`Pokémon ${pokemon.name}`}
                  width='150'
                  height='150'
                  loading='lazy'
                  className='c-lista-pokemon-imagen'
                />
                <p className='c-lista-pokemon-nombre'>{pokemon.name}</p>
                <p className='c-lista-pokemon-id'>ID: {pokemonId}</p>
              </div>
            );
          })}
        </section>
      ) : (
        <p className="c-lista-mensaje-vacio">
          {busqueda.trim() !== '' ? `No se encontraron Pokémon para "${busqueda}".` : "No hay Pokémon para mostrar con el filtro actual."}
        </p>
      )}
       {/* Opcional: Indicador de total de Pokémon mostrados vs total general */}
       <footer className="c-listar-footer">
            Mostrando {resultadosFiltrados.length} Pokémon.
            {tipoSeleccionado === 'All' && busqueda.trim() === '' && ` (Total en Pokédex: ${totalPokes})`}
       </footer>
    </div>
  );
}

export default Listar;