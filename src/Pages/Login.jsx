import React, { useState } from "react";
import Footer from "../components/Footer";

export const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí puedes realizar la verificación del login
    // Verifica si el username y la contraseña son válidos

    if (email === 'youremail@example.com' && password === '123456') {
      onLogin(); // llamamos a la función `onLogin` pasada como props para actualizar el estado de logueo
    } else {
      alert('ERROR: Email or Password invalid');
    }
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
              <form >
                <h2 className='title'>Login</h2>
                  <label>Email:</label>
                  <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                  <label>Password:</label>
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                  <a className="preg">Haven't registered yet?</a>
                  <a href="/register" className="preg">Register</a><br />
                  <button onClick={window} className="ButtonSub">Sign In</button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

