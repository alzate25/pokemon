// src/Componentes/Usuario/index.jsx
import { useState } from 'react';
import { supabase } from '../../supabase'; // Asegúrate de que la ruta sea correcta
import './style.css';

function Usuario() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login'); // 'login' | 'register' | 'profile'
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      alert('Error al registrar: ' + error.message);
    } else {
      alert('Registro exitoso. Por favor, verifica tu correo electrónico.');
      setView('login');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      alert('Error al iniciar sesión: ' + error.message);
    } else {
      setUser(data.user);
      setView('profile');
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setView('login');
  };

  return (
    <section className="c-usuario-container">
      <header className="c-usuario-header">
        <h1>Perfil de Usuario</h1>
      </header>

      <div className="c-usuario-contenido">
        {view === 'login' && (
          <form onSubmit={handleLogin}>
            <h2>Iniciar Sesión</h2>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleInput}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleInput}
              required
            />
            <button type="submit">Entrar</button>
            <p>
              ¿No tienes cuenta?{' '}
              <button type="button" onClick={() => setView('register')}>
                Regístrate
              </button>
            </p>
          </form>
        )}

        {view === 'register' && (
          <form onSubmit={handleRegister}>
            <h2>Registro</h2>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleInput}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleInput}
              required
            />
            <button type="submit">Registrarse</button>
            <p>
              ¿Ya tienes cuenta?{' '}
              <button type="button" onClick={() => setView('login')}>
                Inicia sesión
              </button>
            </p>
          </form>
        )}

        {view === 'profile' && user && (
          <div>
            <h2>Bienvenido, {user.email}</h2>
            <p>Aquí podrás gestionar tu perfil en el futuro.</p>
            <button onClick={logout}>Cerrar sesión</button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Usuario;
