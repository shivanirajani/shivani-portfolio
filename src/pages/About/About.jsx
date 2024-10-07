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
        <h2 className="h2 article-title">About Me</h2>
      </header>
      
      <section className="about-text">
        <p>
          Hello! I&apos;m Shivani, a final-year student at Newcastle University, having completed my placement year at two tech companies in Spain. I am interested in web development because it allows me to create functional and visually stunning digital experiences. My interest in front-end web development emerged when I worked on a university project to create a book exchange website, aimed at ensuring inclusive education and promoting lifelong learning opportunities for all.
        </p>
        <p>
          My skills revolve around HTML, CSS, JavaScript, React, and Next.js. My goal is to further explore web development and make digital experiences accessible and engaging for everyone. I would like to learn more about technologies such as Vue.js, Three.js, and I am also interested in venturing into back-end development and learning PHP. Additionally, I would like to learn Figma.
        </p>
        <p>
          I would love to collaborate with industry professionals and teams to gain practical experience and contribute to meaningful projects. Whether you are looking for interns to join your team or seeking fresh perspectives on a front-end development project, I am here to learn, share my knowledge, and work together.
        </p>
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
