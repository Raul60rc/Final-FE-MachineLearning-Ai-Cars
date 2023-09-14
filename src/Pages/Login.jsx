import React, { useState } from "react";
import Footer from "../components/Footer";

export const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Realizar una petición al servidor para verificar las credenciales
    // Aquí puedes usar axios, fetch, u otra librería de tu elección

    // Si las credenciales son correctas, guardar el token de sesión en el localStorage
    const token = "token_de_ejemplo";
    localStorage.setItem("token", token);

    // Llamar a la función onLogin para indicar que el usuario ha iniciado sesión
    onLogin();
  };

  return (
    <>
      <section className="contact-page">
        <div className="container">
          <div className="contact-div">
            <div className="contact-div__text">
            <h2>Create your free account on our website</h2>
              <p>
              With your account you can manage your activity 
              whenever and wherever you want. This way you can 
              control your appraisals, purchases and sales at 
              any time without problems.
              </p>
              <p>
              Save, manage and receive your latest searches 
              in your email and on your smartphone.
              </p>
              <p>
              It's an easy way to manage your appraisals and offers.
              </p>
              <p className="copyright">By registering you accept our <a href="/conditions">terms and conditions</a> as well as our <a href="/privacy">privacy policy</a>.</p>
            </div>
            <div className="contact-div__form">
              <form>
                <h2 className='title'>Login</h2>
                    <label>Email:</label>
                    <input type="text" placeholder="Email" className="inputform" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label>Password:</label>
                    <input type="password" placeholder="Password" className="inputform" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <a className="preg">Haven't registered yet?</a>
                    <a href="/register" className="preg">Register</a><br />
                    <button onClick={handleLogin} className="ButtonSub">Sign In</button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

            