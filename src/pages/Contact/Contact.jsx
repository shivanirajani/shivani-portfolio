import React, { useRef, useState, useEffect } from 'react';
import { FaRegEnvelope } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [language, setLanguage] = useState("en");
  const [fade, setFade] = useState(true);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setShowModal(true); // Show modal immediately
    setConfirmationMessage(
      language === "es" ? "Enviando mensaje..." : "Sending message..."
    );
  
    emailjs
      .sendForm('service_kfxmgnh', 'template_3rvwo94', form.current, {
        publicKey: '4ufXFHOu330069y8T',
      })
      .then(
        (result) => {
          const message = language === "es"
            ? '¡Mensaje enviado con éxito!'
            : 'Message sent successfully!';
          setConfirmationMessage(message); // update message after success
          console.log(message, result.text);
        },
        (error) => {
          const errorMsg = language === "es"
            ? 'Error al enviar el mensaje.'
            : 'Failed to send the message.';
          setConfirmationMessage(errorMsg); // update message after failure
          console.log(errorMsg, error.text);
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
      },
      close: "Close"
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
      },
      close: "Cerrar"
    }
  };

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

      {/* Modal */}
      {showModal && (
        <div style={modalOverlay}>
          <div style={modalStyle}>
            <p>{confirmationMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              style={modalButton}
            >
              {content[language].close}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.6)", // dark overlay
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
  backdropFilter: "blur(2px)",
};

const modalStyle = {
  backgroundColor: "#111", // dark background
  color: "white", // white text
  padding: "2em",
  borderRadius: "12px",
  border: "4px solid #b4afe9", // purple border to match your design
  maxWidth: "400px",
  width: "90%",
  textAlign: "center",
  boxShadow: "0 0 20px rgba(0, 0, 0, 0.4)",
  fontSize: "1.1rem",
};

const modalButton = {
  display: "block", // make the button take full width so margin auto works
  marginTop: "1.5em",
  marginLeft: "auto",
  marginRight: "auto",
  padding: "0.5em 1.2em",
  backgroundColor: "#b4afe9", // purple background
  color: "white",
  border: "4px solid rgba(255, 255, 255, 0.5)", // semi-transparent white border
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: "600",
  transition: "background-color 0.2s ease-in-out",
};



export default Contact;
