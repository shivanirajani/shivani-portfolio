import React, { useState } from 'react';
import { FaBook, FaLaptop, FaUniversity, FaHandsHelping } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import TimelineItem from './TimelineItem';

const Resume = () => {
  const [language, setLanguage] = useState("en");

  const content = {
    en: {
      title: "Career",
      educationTitle: "Education",
      workTitle: "Work Experience",
      coursesTitle: "Courses",
      volunteeringTitle: "Volunteering",
      timelineItems: {
        education: [
          { degree: "Computer Science", place: "Newcastle University", date: "2021 — Present", description: "React, Python, MongoDB, SQL, Java" },
          { place: "British School of Gran Canaria", date: "2006 — 2021", description: "A Levels in Spanish, Chemistry, Mathematics" }
        ],
        workExperience: [
          { work: "Full Stack Developer", place: "Lãberit", date: "September 2024 — Present", description: "Angular, Figma, Python Flask, MySQL, SCSS, HTML, JavaScript" },
          { work: "Frontend Developer", place: "Lãberit", date: "June 2024 — August 2024", description: "Angular, Figma, Python Flask, MySQL, SCSS, HTML, JavaScript" },
          { work: "Consultant & Application Developer", place: "TICWAY", date: "September 2023 — July 2024", description: "React, Next.JS, Microsoft SQL Server, PowerBI, Python" },
        ],
        courses: [
          { work: "PHP for Beginners", place: "Great Learning Academy", date: "April 2024", description: "PHP" },
          { work: "Introduction to Generative AI", place: "Google Cloud Skills Boost", date: "April 2024" },
          { work: "Front End Development Libraries", place: "freeCodeCamp", date: "April 2024", description: "HTML, JavaScript, CSS, React, Bootstrap" },
          { work: "Couch to Coder", place: "Bright Network Academy", date: "August 2023 — September 2023", description: "Python" }
        ],
        volunteering: [
          { work: "Peer Mentor for Computer Science", place: "Newcastle University", date: "September 2024 — Present", description: "Support the academic and personal development of fresher students by creating an inclusive and engaging environment." },
          { work: "President of Bollywood Dance Society", place: "Newcastle University", date: "September 2024 — Present", description: "Leading the society by overseeing and coordinating all activity." },
          { work: "Secretary of Bollywood Dance Society", place: "Newcastle University", date: "September 2023 — August 2024", description: "Oversee the society's email inbox and assist with various administrative responsibilities to ensure smooth operations."}
        ]
      }
    },
    es: {
      title: "Carrera",
      educationTitle: "Educación",
      workTitle: "Experiencia laboral",
      coursesTitle: "Cursos",
      volunteeringTitle: "Voluntariado",
      timelineItems: {
        education: [
          { degree: "Ciencias de la Computación", place: "Newcastle University", date: "2021 — Presente", description: "React, Python, MongoDB, SQL, Java" },
          { place: "British School of Gran Canaria", date: "2006 — 2021", description: "A Levels en Lengua Castellaña, Química, Matemáticas" }
        ],
        workExperience: [
          { work: "Desarrolladora Full Stack", place: "Lãberit", date: "Septiembre 2024 — Presente", description: "Angular, Figma, Python Flask, MySQL, SCSS, HTML, JavaScript" },
          { work: "Desarrolladora Frontend", place: "Lãberit", date: "Junio 2024 — Agosto 2024", description: "Angular, Figma, Python Flask, MySQL, SCSS, HTML, JavaScript" },
          { work: "Consultora y Desarrolladora de Aplicaciones", place: "TICWAY", date: "Septiembre 2023 — Julio 2024", description: "React, Next.JS, Microsoft SQL Server, PowerBI, Python" },
        ],
        courses: [
          { work: "PHP para Principiantes", place: "Great Learning Academy", date: "Abril 2024", description: "PHP" },
          { work: "Introducción a la IA Generativa", place: "Google Cloud Skills Boost", date: "Abril 2024" },
          { work: "Frameworks Desarrollo Front End", place: "freeCodeCamp", date: "Abril 2024", description: "HTML, JavaScript, CSS, React, Bootstrap" },
          { work: "Couch to Coder", place: "Bright Network Academy", date: "Agosto 2023 — Septiembre 2023", description: "Python" }
        ],
        volunteering: [
          { work: "Mentor para Estudiantes de Ciencias de la Computación", place: "Newcastle University", date: "Septiembre 2024 — Presente", description: "Apoyo al desarrollo académico y personal de los estudiantes nuevos." },
          { work: "Presidenta de Bollywood Dance Society", place: "Newcastle University", date: "Septiembre 2024 — Presente", description: "Liderar el equipo, supervisando y coordinando todas sus actividades." },
          { work: "Secretaria de Bollywood Dance Society", place: "Newcastle University", date: "Septiembre 2023 — Agosto 2024", description: "Gestionar la bandeja de entrada del correo electrónico del equipo y apoyar en las tareas administrativas para garantizar su buen funcionamiento." }
        ]
      }
    }
  };

  const fadeVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  };

  return (
    <section>
      <header>
        <h2 className="h2 article-title">{content[language].title}</h2>
        <div style={{ fontSize: "1.5rem", cursor: "pointer", display: "flex", gap: "10px", marginBottom: "20px" }}>
          <span
            onClick={() => setLanguage("en")}
            title="English"
            style={{ opacity: language === "en" ? 1 : 0.6 }}
          >
            🇬🇧
          </span>
          <span
            onClick={() => setLanguage("es")}
            title="Español"
            style={{ opacity: language === "es" ? 1 : 0.6 }}
          >
            🇪🇸
          </span>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={language}
          variants={fadeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Education Section */}
          <div className="timeline">
            <div className="title-wrapper">
              <div className="icon-box">
                <FaUniversity />
              </div>
              <h3 className="h3">{content[language].educationTitle}</h3>
            </div>
            <ol className="timeline-list">
              {content[language].timelineItems.education.map((item, index) => (
                <TimelineItem
                  key={index}
                  degree={item.degree}
                  place={item.place}
                  date={item.date}
                  description={item.description}
                />
              ))}
            </ol>
          </div>

          {/* Work Experience Section */}
          <div className="timeline">
            <div className="title-wrapper">
              <div className="icon-box">
                <FaLaptop />
              </div>
              <h3 className="h3">{content[language].workTitle}</h3>
            </div>
            <ol className="timeline-list">
              {content[language].timelineItems.workExperience.map((item, index) => (
                <TimelineItem
                  key={index}
                  work={item.work}
                  place={item.place}
                  date={item.date}
                  description={item.description}
                />
              ))}
            </ol>
          </div>

          {/* Courses Section */}
          <div className="timeline">
            <div className="title-wrapper">
              <div className="icon-box">
                <FaBook />
              </div>
              <h3 className="h3">{content[language].coursesTitle}</h3>
            </div>
            <ol className="timeline-list">
              {content[language].timelineItems.courses.map((item, index) => (
                <TimelineItem
                  key={index}
                  work={item.work}
                  place={item.place}
                  date={item.date}
                  description={item.description}
                />
              ))}
            </ol>
          </div>

          {/* Volunteering Section */}
          <div className="timeline">
            <div className="title-wrapper">
              <div className="icon-box">
                <FaHandsHelping />
              </div>
              <h3 className="h3">{content[language].volunteeringTitle}</h3>
            </div>
            <ol className="timeline-list">
              {content[language].timelineItems.volunteering.map((item, index) => (
                <TimelineItem
                  key={index}
                  work={item.work}
                  place={item.place}
                  date={item.date}
                  description={item.description}
                />
              ))}
            </ol>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Resume;
