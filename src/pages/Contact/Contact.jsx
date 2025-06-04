import React, { useRef, useState } from 'react';
import { FaRegEnvelope } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [language, setLanguage] = useState("en");
  const [fade, setFade] = useState(true);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_kfxmgnh', 'template_3rvwo94', form.current, {
        publicKey: '4ufXFHOu330069y8T',
      })
      .then(
        (result) => {
          console.log(language === "es" ? '¡Enviado con éxito!' : 'Sent successfully!', result.text);
        },
        (error) => {
          console.log(language === "es" ? 'Error en el envío...' : 'Failed to send...', error.text);
        }
      );

    form.current.reset();
  };

  const content = {
    en: {
      title: "Contact",
      placeholders: {
        name: "Name",
        surname: "Surname",
        email: "Email",
        phone: "Phone Number",
        subject: "Subject",
        message: "Message",
        submit: "Submit"
      }
    },
    es: {
      title: "Contacto",
      placeholders: {
        name: "Nombre",
        surname: "Apellidos",
        email: "Correo electrónico",
        phone: "Número de teléfono",
        subject: "Asunto",
        message: "Mensaje",
        submit: "Enviar"
      }
    }
  };

  // Toggle language with fade effect
  const toggleLanguage = () => {
    setFade(false);
    setTimeout(() => {
      setLanguage((prev) => (prev === "en" ? "es" : "en"));
      setFade(true);
    }, 300);
  };

  return (
    <section
      className="contact"
      data-page="contact"
      style={{ opacity: fade ? 1 : 0, transition: "opacity 0.3s ease-in-out" }}
    >
      <header>
        <h2 className="h2 article-title">{content[language].title}</h2>
        <button
  onClick={toggleLanguage}
  style={{
    marginBottom: "2em",
    padding: "0.5em 1em",
    backgroundColor: "#b4afe9",
    color: "white",
    border: "4px solid rgba(255, 255, 255, 0.5)",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "0.5em"
  }}
  aria-label="Toggle Language"
>
  <span style={{ fontSize: "1.2em" }}>
    {language === "en" ? "🇪🇸" : "🇬🇧"}
  </span>
  {language === "en" ? "Cambiar a Español" : "Change to English"}
</button>


      </header>

      <section className="mapbox" data-mapbox>

      <figure>
  <iframe
    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d389392.3051817583!2d-15.84713117499756!3d28.056942601993295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc40950e91c097d1%3A0xab36b5ac5338ba65!2sLas%20Palmas%20de%20Gran%20Canaria!5e0!3m2!1s${language}!2s${language}!4v1748986976534!5m2!1s${language}!2s${language}`}
    width="600"
    height="450"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title={language === "es" ? "Mapa de Las Palmas de Gran Canaria" : "Map of Las Palmas de Gran Canaria"}
  />
</figure>



      </section>

      <section className="contact-form">
        <form className="form" onSubmit={sendEmail} ref={form}>
          <div className="input-wrapper">
            <input type="text" name="nombre" className="form-input" placeholder={content[language].placeholders.name} required />
            <input type="text" name="apellidos" className="form-input" placeholder={content[language].placeholders.surname} required />
            <input type="email" name="email" className="form-input" placeholder={content[language].placeholders.email} required />
            <input type="tel" name="telefono" className="form-input" placeholder={content[language].placeholders.phone} required />
          </div>

          <textarea name="asunto" className="form-input" placeholder={content[language].placeholders.subject} required></textarea>
          <textarea name="mensaje" className="form-input" placeholder={content[language].placeholders.message} required></textarea>

          <button className="form-btn" type="submit">
            <FaRegEnvelope />
            <span>{content[language].placeholders.submit}</span>
          </button>
        </form>
      </section>
    </section>
  );
};

export default Contact;

