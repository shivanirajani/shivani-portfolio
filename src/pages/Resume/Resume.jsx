import React, { useState } from 'react';
import { FaBook, FaLaptop, FaUniversity, FaHandsHelping } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';

const Resume = () => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => setLanguage(prev => (prev === "en" ? "es" : "en"));

  const techStyle = {
    backgroundColor: "#b4afe9",
    color: "#fff",
    fontSize: "0.8rem",
    padding: "3px 8px",
    borderRadius: "12px",
    marginRight: "6px",
    display: "inline-block",
    marginBottom: "4px",
  };

  const TimelineItem = ({ degree, work, place, date, description, useTechStyle = true }) => {
    const renderDescription = () => {
      if (!description) return null;
    
      if (useTechStyle) {
        return (
          <div>
            {description.split(',').map((tech, index) => (
              <span key={index} style={techStyle}>
                {tech.trim()}
              </span>
            ))}
          </div>
        );
      }
    
      // Set paragraph text color to white
      return <p style={{ marginTop: "0.5em", color: "#fff" }}>{description}</p>;
    };
    
    

    return (
      <li className="timeline-item">
        <h4 className="h4 timeline-item-title">{degree || work}</h4>
        <span>{place}</span>
        <span className="timeline-date">{date}</span>
        {renderDescription()}
      </li>
    );
  };

  const content = {
    en: {
      title: "Career",
      educationTitle: "Education",
      workTitle: "Work Experience",
      coursesTitle: "Courses",
      volunteeringTitle: "Volunteering",
      timelineItems: {
        education: [
          { degree: "Computer Science", place: "Newcastle University", date: "2021 — 2025", description: "React, Python, MongoDB, SQL, Java, Jupyter Notebook" },
          { place: "British School of Gran Canaria", date: "2006 — 2021", description: "A Levels in Spanish, Chemistry, Mathematics" }
        ],
        workExperience: [
          { work: "xTech Analyst", place: "BIP Spain", date: "September 2025", description: "React Native, Next.js, Typescript, Tailwind CSS, Zustand, Gitlab, Jira" },
          { work: "Frontend Developer", place: "Lãberit", date: "September 2024 — April 2025", description: "Angular, Figma, Python Flask, MySQL, SCSS, HTML, JavaScript" },
          { work: "Frontend Developer Intern", place: "Lãberit", date: "June 2024 — August 2024", description: "Angular, Figma, Python Flask, MySQL, SCSS, HTML, JavaScript" },
          { work: "Consultant & Application Developer", place: "TICWAY", date: "September 2023 — July 2024", description: "React, Next.JS, Microsoft SQL Server, PowerBI, Python" },
        ],
        courses: [
          { work: "Introduction to AWS", place: "Udemy", date: "October 2025", description: "AWS Fundamentals" },
          { work: "React Native", place: "Udemy", date: "October 2025", description: "React Native" },
          { work: "PHP for Beginners", place: "Great Learning Academy", date: "April 2024", description: "PHP" },
          { work: "Introduction to Generative AI", place: "Google Cloud Skills Boost", date: "April 2024" },
          { work: "Front End Development Libraries", place: "freeCodeCamp", date: "April 2024", description: "HTML, JavaScript, CSS, React, Bootstrap" },
          { work: "Couch to Coder", place: "Bright Network Academy", date: "August 2023 — September 2023", description: "Python" }
        ],
        volunteering: [
          { work: "Web Developer Intern", place: "Venture Validation Lab", date: "March 2025 — Present", description: "Wordpress, Elementor"},
          { work: "Peer Mentor for Computer Science", place: "Newcastle University", date: "September 2024 — April 2025", description: "Support the academic and personal development of fresher students by creating an inclusive and engaging environment." },
          { work: "President of Bollywood Dance Society", place: "Newcastle University", date: "September 2024 — May 2025", description: "Leading the society by overseeing and coordinating all activity." },
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
          { degree: "Ciencias de la Computación", place: "Newcastle University", date: "2021 — 2025", description: "React, Python, MongoDB, SQL, Java, Jupyter Notebook" },
          { place: "British School of Gran Canaria", date: "2006 — 2021", description: "A Levels en Lengua Castellaña, Química, Matemáticas" }
        ],
        workExperience: [
          { work: "xTech Analyst", place: "BIP Spain", date: "Septiembre 2025", description: "React Native, Next.js, Typescript, Tailwind CSS, Zustand, Gitlab, Jira" },
          { work: "Desarrolladora Frontend", place: "Lãberit", date: "Septiembre 2024 — Marzo 2025", description: "Angular, Figma, Python Flask, MySQL, SCSS, HTML, JavaScript" },
          { work: "Prácticas Desarrolladora Frontend", place: "Lãberit", date: "Junio 2024 — Agosto 2024", description: "Angular, Figma, Python Flask, MySQL, SCSS, HTML, JavaScript" },
          { work: "Consultora y Desarrolladora de Aplicaciones", place: "TICWAY", date: "Septiembre 2023 — Julio 2024", description: "React, Next.JS, Microsoft SQL Server, PowerBI, Python" },
        ],
        courses: [
          { work: "Introduction to AWS", place: "Udemy", date: "October 2025", description: "AWS Fundamentals" },
          { work: "React Native", place: "Udemy", date: "October 2025", description: "React Native" },
          { work: "PHP para Principiantes", place: "Great Learning Academy", date: "Abril 2024", description: "PHP" },
          { work: "Introducción a la IA Generativa", place: "Google Cloud Skills Boost", date: "Abril 2024" },
          { work: "Frameworks Desarrollo Front End", place: "freeCodeCamp", date: "Abril 2024", description: "HTML, JavaScript, CSS, React, Bootstrap" },
          { work: "Couch to Coder", place: "Bright Network Academy", date: "Agosto 2023 — Septiembre 2023", description: "Python" }
        ],
        volunteering: [
          { work: "Desarrolladora Web", place: "Venture Validation Lab", date: "March 2025 — Presente", description: "Wordpress, Elementor"},
          { work: "Mentor para Estudiantes de Ciencias de la Computación", place: "Newcastle University", date: "Septiembre 2024 — Abril 2025", description: "Apoyo al desarrollo académico y personal de los estudiantes nuevos." },
          { work: "Presidenta de Bollywood Dance Society", place: "Newcastle University", date: "Septiembre 2024 — Mayo 2025", description: "Liderar el equipo, supervisando y coordinando todas sus actividades." },
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
            gap: "0.5em",
          }}
          aria-label="Toggle Language"
        >
          <span style={{ fontSize: "1.2em" }}>
            {language === "en" ? "🇪🇸" : "🇬🇧"}
          </span>
          {language === "en" ? "Cambiar a Español" : "Change to English"}
        </button>
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
            <TimelineItem key={index} {...item} useTechStyle={index !== 1} />
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
                <TimelineItem key={index} {...item} useTechStyle={true} />
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
                <TimelineItem key={index} {...item} useTechStyle={true} />
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
                <TimelineItem key={index} {...item} useTechStyle={index === 0} />
              ))}
            </ol>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Resume;