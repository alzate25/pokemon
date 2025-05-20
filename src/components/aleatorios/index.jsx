// src/Componentes/Aleatorio/index.jsx
import { useEffect, useState, useContext, useCallback } from "react"; // Añadido useCallback
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../contexto/contexto'; 

function Aleatorios() {
  const { data, listaCapturados, setListaCapturados, setTipoSeleccionado } = useContext(AppContext);
  const [aleatorios, setAleatorios] = useState([]); // Renombrado a 'aleatorios' para claridad
  const navigate = useNavigate();

  // 1. Si este componente SIEMPRE debe establecer el tipo a "All" al montarse:
  useEffect(() => {
    setTipoSeleccionado("All");
  }, [setTipoSeleccionado]); // setTipoSeleccionado es estable, pero es buena práctica incluirla.

  const generarNuevosAleatorios = useCallback(() => {
    if (!data || data.length === 0) {
      // No hacer nada si no hay datos base de Pokémon
      setAleatorios([]); // Limpiar aleatorios si no hay datos
      return;
    }

    let nuevosPokemonAleatorios = [];
    const pokemonsSeleccionadosIndices = new Set(); // Para evitar seleccionar el mismo Pokémon más de una vez en una generación

    // Intentar obtener 4 Pokémon únicos, o menos si no hay suficientes datos
    const maxIntentos = data.length * 2; // Evitar bucles infinitos si hay pocos datos
    let intentos = 0;

    while (nuevosPokemonAleatorios.length < 4 && nuevosPokemonAleatorios.length < data.length && intentos < maxIntentos) {
      const index = Math.floor(Math.random() * data.length);
      if (!pokemonsSeleccionadosIndices.has(index)) {
        if (data[index] && data[index].url && data[index].name) { // Asegurar que el pokemon tiene la data necesaria
            nuevosPokemonAleatorios.push(data[index]);
            pokemonsSeleccionadosIndices.add(index);
        }
      }
      intentos++;
    }
    setAleatorios(nuevosPokemonAleatorios);

    // Agregar a listaCapturados (asegurando que sean IDs únicos)
    const nuevosIds = nuevosPokemonAleatorios
      .map(pokemon => pokemon.url.split("/")[6])
      .filter(id => id && !listaCapturados.includes(id)); // Asegurar que el ID exista y no esté ya capturado

    if (nuevosIds.length > 0) {
      setListaCapturados(prevLista => [...new Set([...prevLista, ...nuevosIds])]);
    }
  }, [data, listaCapturados, setListaCapturados]); // Dependencias de useCallback

  // 2. Generar aleatorios cuando 'data' (del contexto) esté disponible o cambie.
  useEffect(() => {
    if (data && data.length > 0) {
      generarNuevosAleatorios();
    } else {
      setAleatorios([]); // Limpiar aleatorios si no hay datos
    }
  }, [data, generarNuevosAleatorios]); // generarNuevosAleatorios ahora está memoizada con useCallback

  // Renderizado condicional mientras se carga la data o si no hay aleatorios
  if (!data || data.length === 0) {
    return (
        <section className="c-aleatorio c-lista">
            <p>Cargando datos de Pokémon...</p>
            {/* El botón generar podría estar deshabilitado o no mostrarse aquí */}
        </section>
    );
  }


  return (
    <section className="c-aleatorio c-lista">
      {aleatorios.length > 0 ? (
        aleatorios.map((pokemon) => {
          // Es buena práctica extraer el ID una vez y usarlo
          const pokemonId = pokemon.url.split("/")[6];
          return (
            <div
              className="c-lista-pokemon c-un_aleatorio"
              key={pokemonId || pokemon.name} // Usar ID del Pokémon como key (o nombre si ID no está)
              onClick={() => navigate(`/detalle/${pokemon.name}`)} // Asumiendo que la ruta de detalle espera el nombre
            >
              <p>ID: {pokemonId}</p>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
                alt={`Pokemon ${pokemon.name}`}
                width="200"
                height="200"
                loading="lazy" // loading='lazy' es bueno para imágenes
              />
              <p>{pokemon.name}</p>
            </div>
          );
        })
      ) : (
        <p>No se pudieron generar Pokémon aleatorios. Intenta de nuevo.</p>
      )}
      <button onClick={generarNuevosAleatorios} disabled={!data || data.length === 0}>
        Generar Nuevos
      </button>
    </section>
  );
}

export default Aleatorios;