import React, { useRef, useState } from 'react';
import { FaRegEnvelope } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [feedback, setFeedback] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_kfxmgnh', 'template_3rvwo94', form.current, {
        user_id: '4ufXFHOu330069y8T', // Ensure to use the correct user_id
      })
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          setFeedback('Email sent successfully!');
          form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
          setFeedback('Failed to send email. Please try again.');
        }
      );
  };

  return (
    <section className="contact" data-page="contact">
      <header>
        <h2 className="h2 article-title">Contact</h2>
      </header>

      <section className="mapbox" data-mapbox>
        <figure>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d73226.62573739623!2d-1.7394154944650821!3d55.00234419516514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487d857e0c6f64cd%3A0xbe252b072a76191!2sNewcastle%20upon%20Tyne!5e0!3m2!1sen!2suk!4v1728296201843!5m2!1sen!2suk" 
            width="600" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade" 
            title="Map of Newcastle upon Tyne"
          />
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
