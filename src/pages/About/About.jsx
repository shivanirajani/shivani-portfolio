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
  
  // New fade state to control opacity
  const [fade, setFade] = useState(true);

  useEffect(() => {
    fetch('testimonials.json')
      .then(res => res.json())
      .then(data => setTestimonials(data));
  }, []);

  const content = {
    en: {
      title: "About Me",
      description1: "Hello! I'm Shivani, a final-year student at Newcastle University, having completed my placement year at two tech companies in Spain. I am interested in web development because it allows me to create functional and visually stunning digital experiences. My interest in front-end web development emerged when I worked on a university project to create a book exchange website",
      description2: "My skills revolve around HTML, CSS, JavaScript, React, and Next.js. My goal is to further explore web development and make digital experiences accessible and engaging for everyone. I would like to learn more about technologies such as Vue.js, Three.js, and I am also interested in venturing into back-end development and learning PHP. Additionally, I would like to learn Figma.",
      description3: "I would love to collaborate with industry professionals and teams to gain practical experience and contribute to meaningful projects. Whether you are looking for interns to join your team or seeking fresh perspectives on a front-end development project, I am here to learn, share my knowledge, and work together."
    },
    es: {
      title: "Sobre mí",
      description1: "¡Hola! Soy Shivani, estudiante de último año en la Universidad de Newcastle, habiendo completado mi año de prácticas en dos empresas tecnológicas en España. Me interesa el desarrollo web porque me permite crear experiencias digitales funcionales y visualmente impresionantes. Mi interés en el desarrollo front-end surgió cuando trabajé en un proyecto universitario para crear un sitio web de intercambio de libros.",
      description2: "Mis habilidades giran en torno a HTML, CSS, JavaScript, React y Next.js. Mi objetivo es seguir explorando el desarrollo web y hacer que las experiencias digitales sean accesibles y atractivas para todos. Me gustaría aprender más sobre tecnologías como Vue.js, Three.js, y también estoy interesada en adentrarme en el desarrollo back-end y aprender PHP. Además, me gustaría aprender Figma..",
      description3: "Me encantaría colaborar con profesionales de la industria y equipos para ganar experiencia práctica y contribuir a proyectos significativos. Ya sea que busquen becarios para unirse a su equipo o estén buscando nuevas perspectivas en un proyecto de desarrollo front-end, estoy aquí para aprender, compartir mi conocimiento y trabajar juntos."
    }
  };

  // Change language with fade effect
  const changeLanguage = (lang) => {
    if (lang === language) return;
    setFade(false); // fade out
    setTimeout(() => {
      setLanguage(lang);
      setFade(true); // fade in
    }, 300); // match with CSS transition duration
  };

  return (
    <article
      className="about active"
      data-page="about"
      style={{ opacity: fade ? 1 : 0, transition: "opacity 0.3s ease-in-out" }}
    >
      <header>
        <h2 className="h2 article-title">{content[language].title}</h2>

        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "10px" }}>
          <span
            onClick={() => changeLanguage("en")}
            style={{
              cursor: "pointer",
              fontSize: "1.5rem",
              opacity: language === "en" ? 1 : 0.5
            }}
            title="Switch to English"
          >
            🇬🇧
          </span>
          <span
            onClick={() => changeLanguage("es")}
            style={{
              cursor: "pointer",
              fontSize: "1.5rem",
              opacity: language === "es" ? 1 : 0.5
            }}
            title="Switch to Spanish"
          >
            🇪🇸
          </span>
        </div>
      </header>

      <section className="about-text">
        <p>{content[language].description1}</p>
        <p>{content[language].description2}</p>
        <p>{content[language].description3}</p>
      </section>

      <section className="service">
        <ul className="service-list">
          {iconsData.map((iconData) => (
            <li key={iconData.id} className="service-item">
              <a href={iconData.href} target="_blank" rel="noopener noreferrer">
                <img src={iconData.icon} alt={iconData.name} title={iconData.name} />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default About;
