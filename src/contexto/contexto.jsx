// src/Contexto/contexto.jsx
import { createContext, useState, useEffect } from 'react';

// Exportamos AppContext para que lo usen los componentes consumidores (con useContext)
export const AppContext = createContext();

// Exportamos AppProvider para envolver la aplicación o partes de ella
export function AppProvider({ children }) {
    const totalPokes = 1025; // Se puede mantener como const si no cambia
    const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
    const [favoritos, setFavoritos] = useState(favoritosGuardados);

    const [data, setData] = useState([]);
    const [tipoSeleccionado, setTipoSeleccionado] = useState('All'); // Valor inicial 'All'

    const capturadosGuardados = JSON.parse(localStorage.getItem("capturados")) || [];
    const [listaCapturados, setListaCapturados] = useState(capturadosGuardados);
 
    const [usuario, setUsuario] = useState(null); // en el contexto

    // Dentro de useEffect:
    supabase.auth.getSession().then(({ data: { session } }) => {
    if (session?.user) {
        setUsuario(session.user);
    }
    });

    useEffect(() => {
      const obtenerDatos = async () => {
        try {
          let url;
          if (tipoSeleccionado === 'All' || !tipoSeleccionado) { // Manejar null o undefined para tipoSeleccionado
            url = `https://pokeapi.co/api/v2/pokemon?limit=${totalPokes}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Error al cargar Pokémon: ${res.status}`);
            const json = await res.json();
            setData(json.results || []); // Asegurar que data sea un array
          } else {
            url = `https://pokeapi.co/api/v2/type/${tipoSeleccionado}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Error al cargar tipo: ${res.status}`);
            const json = await res.json();
            // La estructura de /type/{name} es json.pokemon, que es un array de {pokemon: {name, url}, slot}
            const listaFiltrada = json.pokemon ? json.pokemon.map(p => p.pokemon) : [];
            setData(listaFiltrada);
          }
        } catch (error) {
          console.error("Error en obtenerDatos (Contexto):", error);
          setData([]); // En caso de error, establecer data como array vacío para evitar problemas en map
        }
      };
 
      obtenerDatos();
    }, [tipoSeleccionado, totalPokes]); // totalPokes si fuera dinámico

    useEffect(() => {
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }, [favoritos]);

    useEffect(() => {
        localStorage.setItem("capturados", JSON.stringify(listaCapturados));
    }, [listaCapturados]);

    return (
        <AppContext.Provider value={{ 
            favoritos, setFavoritos, 
            data, setData, // Aunque setData se usa internamente, puede ser útil exponerla
            tipoSeleccionado, setTipoSeleccionado, 
            listaCapturados, setListaCapturados,
            totalPokes
        }}>
            {children}
        </AppContext.Provider>
    );
}