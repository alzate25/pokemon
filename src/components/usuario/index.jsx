// src/Componentes/Usuario/index.jsx
import { useState, useEffect } from "react";
import "./style.css";

function Usuario() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("login"); // 'login' | 'register' | 'profile'
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    // Cargar usuario guardado si existe
    const storedUser = localStorage.getItem("loggedUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setView("profile");
    }
  }, []);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.find((u) => u.email === formData.email);
    if (exists) {
      alert("El usuario ya existe.");
      return;
    }
    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    setFormData({ email: "", password: "" });
    setView("login");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const match = users.find(
      (u) =>
        u.email === formData.email && u.password === formData.password
    );
    if (match) {
      setUser(match);
      localStorage.setItem("loggedUser", JSON.stringify(match));
      setView("profile");
    } else {
      alert("Credenciales incorrectas.");
    }
  };

  const logout = () => {
    localStorage.removeItem("loggedUser");
    setUser(null);
    setView("login");
    setFormData({ email: "", password: "" });
  };

  return (
    <section className="c-usuario-container">
      <header className="c-usuario-header">
        <h1>Perfil de Usuario</h1>
      </header>

      <div className="c-usuario-contenido">
        {view === "login" && (
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
              ¿No tienes cuenta?{" "}
              <button type="button" onClick={() => setView("register")}>
                Regístrate
              </button>
            </p>
          </form>
        )}

        {view === "register" && (
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
              ¿Ya tienes cuenta?{" "}
              <button type="button" onClick={() => setView("login")}>
                Inicia sesión
              </button>
            </p>
          </form>
        )}

        {view === "profile" && user && (
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
