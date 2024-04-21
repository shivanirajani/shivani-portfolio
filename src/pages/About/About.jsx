import { useEffect, useState } from "react";
import html5 from "../../assets/html.svg";
import css3 from "../../assets/css.svg";
import javascript from "../../assets/javascript.svg";
import reactjs from "../../assets/react.svg";
import github from "../../assets/github.svg";

import Service from "./Service";

const iconsData = [
  {
    id: 1,
    icon: html5,
    name: "HTML5"
  },
  {
    id: 2,
    icon: css3,
    name: "CSS3"
  },
  {
    id: 3,
    icon: javascript,
    name: "JavaScript"
  },
  {
    id: 4,
    icon: reactjs,
    name: "React JS"
  },
  {
    id: 5,
    icon: github,
    name: "GitHub"
  }
];

const About = () => {
  const [testimonials, setTestimonials] = useState([]);
  
  useEffect(() => {
    fetch('testimonials.json')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setTestimonials(data);
      });
  }, []);
  
  return (
    <article className="about active" data-page="about">
      <header>
        <h2 className="h2 article-title">Sobre Mi</h2>
      </header>
      
      <section className="about-text">
        <p>
          ¡Hola! Soy Shivani, una estudiante de tercer año en la Universidad de Newcastle, actualmente realizando mis prácticas. Me interesa el desarrollo web porque me permite crear experiencias digitales funcionales y visualmente impresionantes. Mi interés en el desarrollo web front-end surgió cuando trabajé en un proyecto universitario, que era crear una página web de intercambio de libros, con el objetivo de garantizar una educación inclusiva y promover oportunidades de aprendizaje permanente para todos.
        </p>
        <p>
          Mis habilidades giran en torno a HTML, CSS, JavaScript, React y Next.js. Mi objetivo es explorar aún más el desarrollo web y hacer que las experiencias digitales sean accesibles y atractivas para todos. Me gustaría aprender más sobre tecnologías como Vue.js, Three.js, y también estoy interesada en adentrarme en el mundo del desarrollo backend. Me gustaría aprender Figma.
        </p>
        <p>
          Me encantaría colaborar con profesionales de la industria y equipos para adquirir experiencia práctica y contribuir a proyectos significativos. Ya sea que estén buscando personas en prácticas para unirse a su equipo o buscando nuevas perspectivas en un proyecto de desarrollo front-end, estoy aquí para aprender, para ofrecer mis conocimientos y trabajar juntos.
        </p>
      </section>
      
      <section className="service">

  <ul className="service-list">
    {iconsData.map((iconData) => (
      <li key={iconData.id} className="service-item">
        <a href={iconData.href} target="_blank">
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
