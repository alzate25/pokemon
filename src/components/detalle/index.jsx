// src/Componentes/Detalle/index.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import { AppContext } from '../../contexto/contexto'; 

function Detalle() {
  const { name } = useParams(); // Obtiene el 'name' (o podría ser 'id') de la URL
  const [datapoke, setDatapoke] = useState(null); // INICIALIZACIÓN: null es mejor para un objeto
  const [loading, setLoading] = useState(true); // Estado para la carga
  const [error, setError] = useState(null); // Estado para errores de fetch

  const { favoritos, setFavoritos } = useContext(AppContext);

  useEffect(() => {
    if (!name) return; // No hacer fetch si no hay 'name'

    setLoading(true);
    setError(null);
    setDatapoke(null); // Limpiar datos anteriores al iniciar nueva carga

    const fetchPokemonDetail = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`); // Usar toLowerCase() por si el nombre viene con mayúsculas
        if (!response.ok) {
          throw new Error(`No se pudo encontrar el Pokémon "${name}". Estado: ${response.status}`);
        }
        const responseData = await response.json();
        setDatapoke(responseData);
      } catch (err) {
        console.error("Error fetching Pokémon details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [name]); // Se ejecuta cada vez que el 'name' en la URL cambia

  // Determinar si el Pokémon actual es favorito (solo si datapoke y su id existen)
  const esFavorito = datapoke && datapoke.id ? favoritos.some(p => p.id === datapoke.id) : false;

  const toggleFavorito = () => {
    if (!datapoke || !datapoke.id) return; // No hacer nada si no hay datos del Pokémon

    if (esFavorito) {
      setFavoritos(prevFavoritos => prevFavoritos.filter(p => p.id !== datapoke.id));
    } else {
      // Asegúrate de guardar la estructura que esperas en la lista de favoritos
      setFavoritos(prevFavoritos => [...prevFavoritos, { id: datapoke.id, nombre: datapoke.name, /* puedes añadir más data si la necesitas en la lista de favoritos, ej: sprite */ }]);
    }
  };

  if (loading) return <p className="c-detalle-mensaje">Cargando detalles del Pokémon...</p>;
  if (error) return <p className="c-detalle-mensaje c-detalle-error">Error: {error}</p>;
  if (!datapoke) return <p className="c-detalle-mensaje">No se encontraron datos para este Pokémon.</p>; // Después de cargar, si datapoke sigue null

  // Obtener el tipo principal de forma segura para la clase CSS
  const tipoPrincipalClass = datapoke.types && datapoke.types.length > 0 ? datapoke.types[0].type.name : 'tipo-desconocido';

  return (
    <div className={`c-detalle-pokemon ${tipoPrincipalClass}`}>
      <div className="c-detalle-cabecera">
        <h2 className="c-detalle-nombre">{datapoke.name} (ID: {datapoke.id})</h2>
        <button onClick={toggleFavorito} className="c-detalle-fav-btn" aria-label="Marcar como favorito">
          {esFavorito ? '❤️ Quitar de Favoritos' : '🤍 Añadir a Favoritos'}
        </button>
      </div>

      <div className="c-detalle-contenido">
        <img
          className="c-detalle-imagen"
          src={datapoke.sprites?.other?.['official-artwork']?.front_default || datapoke.sprites?.front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${datapoke.id}.png`} // Fallback por si alguna ruta de sprite no existe
          alt={`Imagen de ${datapoke.name}`}
        />

        <div className="c-detalle-info">
          <p><strong>Tipo(s):</strong> {datapoke.types ? datapoke.types.map(t => t.type.name).join(', ') : 'No disponible'}</p>
          <p><strong>Altura:</strong> {datapoke.height ? datapoke.height / 10 : '?'} m</p>
          <p><strong>Peso:</strong> {datapoke.weight ? datapoke.weight / 10 : '?'} kg</p>

          <h3 className="c-detalle-subtitulo">Estadísticas Base:</h3>
          <ul className="c-detalle-stats">
            {datapoke.stats ? datapoke.stats.map(stat => (
              <li key={stat.stat.name}>
                <strong>{stat.stat.name.replace('-', ' ')}:</strong> {stat.base_stat}
              </li>
            )) : <li>Estadísticas no disponibles.</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Detalle;