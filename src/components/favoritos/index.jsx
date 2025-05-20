// src/Componentes/Favoritos/index.jsx
import { useContext } from 'react';
import { AppContext } from '../../contexto/contexto'; 
import { useNavigate } from "react-router-dom";

function Favoritos() {
  const { favoritos } = useContext(AppContext); // No necesitamos setFavoritos aquí, solo leerlos
  const navigate = useNavigate();

  if (!favoritos || favoritos.length === 0) {
    return (
      <section className="c-favoritos c-lista-vacia">
        <p>Aún no has añadido ningún Pokémon a tus favoritos.</p>
        <p>¡Explora la lista y marca los que más te gusten con un 🤍!</p>
      </section>
    );
  }

  return (
    <section className='c-favoritos c-lista'>
      <h2 className="c-favoritos-titulo">Mis Pokémon Favoritos</h2>
      <div className='c-lista-grid'> {/* Contenedor para la cuadrícula de Pokémon */}
        {favoritos.map((pokemon) => {
          // Asegurarse de que el objeto pokemon tiene las propiedades esperadas
          // (id y nombre son las que guardamos desde el componente Detalle)
          if (!pokemon || !pokemon.id || !pokemon.nombre) {
            // Podríamos registrar un error o simplemente omitir este elemento
            console.warn("Elemento favorito con formato incorrecto:", pokemon);
            return null; 
          }
          
          return (
            <div
              className='c-lista-pokemon c-favorito-item'
              // Navegar usando pokemon.nombre, ya que Detalle.jsx usa useParams().name para el fetch.
              // Si Detalle.jsx fuera a usar el ID, entonces aquí sería pokemon.id.
              onClick={() => navigate(`/detalle/${pokemon.nombre.toLowerCase()}`)}
              key={pokemon.id} // Usar el ID del Pokémon como key, que debería ser único
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={`Pokémon ${pokemon.nombre}`}
                width='150' // Ajustar tamaño si es necesario para la lista
                height='150'
                loading='lazy'
                className='c-lista-pokemon-imagen'
              />
              <p className='c-lista-pokemon-nombre'>{pokemon.nombre}</p>
              <p className='c-lista-pokemon-id'>ID: {pokemon.id}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Favoritos;