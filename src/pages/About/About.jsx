import { useEffect, useState } from "react";
import html5 from "../../assets/html.svg";
import css3 from "../../assets/css.svg";
import javascript from "../../assets/javascript.svg";
import reactjs from "../../assets/react.svg";
import github from "../../assets/github.svg";

const iconsData = [
  { id: 1, icon: html5, name: "HTML5" },
  { id: 2, icon: css3, name: "CSS3" },
  { id: 3, icon: javascript, name: "JavaScript" },
  { id: 4, icon: reactjs, name: "React JS" },
  { id: 5, icon: github, name: "GitHub" }
];

const About = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [language, setLanguage] = useState("en");
  
  // Fade state for smooth transitions
  const [fade, setFade] = useState(true);

  useEffect(() => {
    fetch('testimonials.json')
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(err => console.error(err));
  }, []);

  const content = {
    en: {
      title: "About Me",
      description1: "Hello, my name is Shivani! I have completed my studies in Computer Science at Newcastle University and have experience as a front-end developer working in collaborative and remote environments. I am passionate about creating intuitive, user-centered digital experiences by combining technical skills with a creative mindset.",
      description2: "I have worked on designing and developing web interfaces using technologies such as JavaScript, React, Next.js, Angular, Node.js, and Python. Additionally, I have experience in UX design, including creating prototypes in Figma, wireframes, and usability testing aimed at enhancing the user experience. I have collaborated with development teams on various projects, delivering practical and functional solutions. I am motivated to participate in innovative projects where I can continue learning, contribute ideas, and make a real impact."
    },
    es: {
      title: "Sobre mí",
      description1: "¡Hola mi nombre es Shivani!  He finalizado mis estudios en Ingeniería Informática en la Universidad de Newcastle y cuento con experiencia como desarrolladora front-end en entornos colaborativos y remotos. Me apasiona crear experiencias digitales intuitivas y centradas en el usuario, combinando habilidades técnicas con una mentalidad creativa.",
      description2: "He trabajado en el diseño y desarrollo de interfaces web utilizando tecnologías como JavaScript, React, Next.js, Angular, Node.js y Python. Además, tengo experiencia en diseño UX, incluyendo la creación de prototipos en Figma, wireframes y pruebas de usabilidad orientadas a mejorar la experiencia del usuario. He colaborado en equipos de desarrollo en diversos proyectos, aportando soluciones funcionales y prácticas. Me motiva participar en proyectos innovadores donde pueda seguir aprendiendo, compartir ideas y generar un impacto real."

    }
  };

  // Change language with fade effect
  const changeLanguage = (lang) => {
    if (lang === language) return;

    setFade(false); // fade out
    setTimeout(() => {
      setLanguage(lang);
      setFade(true);  // fade in
    }, 300); // match CSS transition duration
  };

  return (
    <article
      className="about active"
      data-page="about"
      style={{ opacity: fade ? 1 : 0, transition: "opacity 0.3s ease-in-out" }}
    >
      <header>
        <h2 className="h2 article-title">{content[language].title}</h2>

        <button
  onClick={() => changeLanguage(language === "en" ? "es" : "en")}
  aria-label="Toggle Language"
  style={{
    marginTop: "10px",
    padding: "0.5em 1em",
    backgroundColor: "#b4afe9",
    border: "4px solid rgba(255, 255, 255, 0.5)",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    userSelect: "none",
    color: "white",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "0.5em"
  }}
  type="button"
>
  <span style={{ fontSize: "1.2em" }}>
    {language === "en" ? "🇪🇸" : "🇬🇧"}
  </span>
  {language === "en" ? "Cambiar a Español" : "Change to English"}
</button>

      </header>

      <section className="about-text">
        <p>{content[language].description1}</p>
        <p>{content[language].description2}</p>
        <p>{content[language].description3}</p>
      </section>

      <section className="service">
        <ul className="service-list" style={{ display: "flex", gap: "15px", padding: 0, listStyle: "none" }}>
          {iconsData.map(({ id, icon, name }) => (
            <li key={id} className="service-item" style={{ cursor: "default" }}>
              <img src={icon} alt={name} title={name} style={{ width: 40, height: 40 }} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default About;
