import React, { useRef, useState } from 'react';
import { FaRegEnvelope } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [language, setLanguage] = useState("en");
  const [fade, setFade] = useState(true); // fade state

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

  // Smooth language change with fade effect
  const changeLanguage = (lang) => {
    if (lang === language) return;
    setFade(false); // fade out
    setTimeout(() => {
      setLanguage(lang);
      setFade(true); // fade in
    }, 300); // match CSS transition duration
  };

  return (
    <section
      className="contact"
      data-page="contact"
      style={{ opacity: fade ? 1 : 0, transition: "opacity 0.3s ease-in-out" }}
    >
      <header>
        <h2 className="h2 article-title">{content[language].title}</h2>

        <div style={{ display: "inline-flex", gap: "10px", alignItems: "center", fontSize: "1.5rem", cursor: "pointer" }}>
          <span
            onClick={() => changeLanguage("en")}
            title="English"
            style={{ opacity: language === "en" ? 1 : 0.5 }}
          >
            🇬🇧
          </span>
          <span
            onClick={() => changeLanguage("es")}
            title="Español"
            style={{ opacity: language === "es" ? 1 : 0.5 }}
          >
            🇪🇸
          </span>
        </div>
      </header>

      <section className="mapbox" data-mapbox>
        <figure>
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d73226.62573739623!2d-1.7394154944650821!3d55.00234419516514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487d857e0c6f64cd%3A0xbe252b072a76191!2sNewcastle%20upon%20Tyne!5e0!3m2!1s${language}!2s${language}!4v1728296201843!5m2!1s${language}!2s${language}`}
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={language === "es" ? "Mapa de Newcastle upon Tyne" : "Map of Newcastle upon Tyne"}
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
