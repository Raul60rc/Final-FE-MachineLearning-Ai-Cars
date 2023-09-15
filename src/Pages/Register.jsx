import React, { useState } from 'react';
import Footer from "../components/Footer";

export const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario a una API o procesarlos de alguna otra manera
    console.log(formData);
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
                <form onSubmit={handleSubmit}>
                    <h2 className='title'>Register</h2>
                        <label>Email:</label>
                        <input type="email" placeholder="Email" name="email" className='inputform' value={email} onChange={handleChange} required  />
                        <label>Password:</label>
                        <input type="password" placeholder="Password" name="password" className='inputform' value={password} onChange={handleChange} required  />
                        <a className='preg'>Already have an account?</a>
                        <a href="/login" className='preg'>Sign In</a><br />
                        <button type="submit" className='ButtonSub'>Register</button>
                </form>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

    