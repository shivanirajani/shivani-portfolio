import React, { useRef } from 'react';
import { FaRegEnvelope } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
    .sendForm('service_kfxmgnh', 'template_3rvwo94', form.current, {
      publicKey: '4ufXFHOu330069y8T',
    })
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );

    // Clear the form after submission if needed
    form.current.reset();
  };

  return (
    <section className="contact" data-page="contact">
      <header>
        <h2 className="h2 article-title">Contact</h2>
      </header>

      <section className="mapbox" data-mapbox>
        <figure>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56303.26511151111!2d-15.480816846771004!3d28.117430296106967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc40950e91c097d1%3A0xab36b5ac5338ba65!2sLas%20Palmas%20de%20Gran%20Canaria%2C%20Las%20Palmas!5e0!3m2!1sen!2ses!4v1713660725635!5m2!1sen!2ses"
            width="400" height="300" loading="lazy" title="Google Map"
          ></iframe>
        </figure>
      </section>

      <section className="contact-form">
        <form className="form" onSubmit={sendEmail} ref={form}>
          <div className="input-wrapper">
            <input type="text" name="nombre" className="form-input" placeholder="Name" required />
            <input type="text" name="apellidos" className="form-input" placeholder="Surname" required />
            <input type="email" name="email" className="form-input" placeholder="Email" required />
            <input type="tel" name="telefono" className="form-input" placeholder="Phone Number" required />
          </div>

          <textarea name="asunto" className="form-input" placeholder="Subject" required></textarea>
          <textarea name="mensaje" className="form-input" placeholder="Message" required></textarea>

          <button className="form-btn" type="submit">
            <FaRegEnvelope />
            <span>Submit</span>
          </button>
        </form>
      </section>
    </section>
  );
};

export default Contact;
