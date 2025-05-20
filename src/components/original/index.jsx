// src/Componentes/Original/index.jsx
import { useContext } from 'react'; // useState y useEffect no son necesarios aquí
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../contexto/contexto'; 
import "./style.css"; // Asegúrate que este archivo exista en src/Componentes/Original/style.css

function Original() {
  const { listaCapturados, totalPokes } = useContext(AppContext);
  const navigate = useNavigate();

  // Crear el array de IDs solo si totalPokes es un número válido y mayor que 0
  const espacioPokedex = totalPokes && totalPokes > 0
    ? Array.from({ length: totalPokes }, (_, i) => i + 1)
    : [];

  if (espacioPokedex.length === 0) {
    return (
        <section className="c-pokedex-original c-pokedex-vacio">
            <p>No hay datos de Pokédex para mostrar. (Verifica `totalPokes` en el contexto).</p>
        </section>
    );
  }
  
  // Contar cuántos de la listaCapturados son válidos (números de ID)
  // Esto es por si 'listaCapturados' pudiera tener otros datos por error.
  // Asumimos que los IDs en listaCapturados son strings.
  const numeroCapturadosValidos = listaCapturados.filter(idStr => !isNaN(parseInt(idStr)) && parseInt(idStr) <= totalPokes).length;


  return (
    <div className="c-pokedex-original-container">
      <header className="c-pokedex-original-header">
        <h2>Pokédex Original</h2>
        <p className="c-pokedex-contador">
          Capturados: {numeroCapturadosValidos} / {totalPokes}
        </p>
      </header>
      <section className="c-pokedex-grid">
        {espacioPokedex.map((id) => {
          const esCapturado = listaCapturados.includes(id.toString());
          const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          return (
            <div
              key={id}
              className={`c-pokedex-slot ${esCapturado ? "capturado" : "no-capturado"}`}
              onClick={() => {
                if (esCapturado) {
                  // Navegar a /detalle/ID.
                  // El componente Detalle debe poder manejar un ID numérico o un nombre.
                  // Si Detalle solo maneja nombres, esta navegación fallará o requerirá
                  // obtener el nombre del Pokémon a partir del ID antes de navegar.
                  navigate(`/detalle/${id}`);
                }
                // Opcional: podrías añadir un efecto visual o mensaje si se clickea uno no capturado
              }}
              role="button" // Mejorar accesibilidad
              tabIndex={esCapturado ? 0 : -1} // Permitir foco solo si es capturado
              aria-label={esCapturado ? `Ver detalles del Pokémon ${id}` : `Pokémon ${id} no capturado`}
            >
              <div className="c-pokedex-slot-id-container">
                <span className="c-pokedex-slot-id">{id}</span>
              </div>
              {esCapturado && (
                <img
                  className="c-pokedex-slot-imagen"
                  src={pokemonImageUrl}
                  alt={`Sprite del Pokémon ${id}`} // Texto alternativo más descriptivo
                  width="75" // Un poco más grande para mejor visualización
                  height="75"
                  loading="lazy"
                />
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default Original;