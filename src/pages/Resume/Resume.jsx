import React from 'react';
import { FaBook, FaLaptop, FaRegBookmark, FaUniversity } from "react-icons/fa";
import TimelineItem from './TimelineItem';

const Resume = () => {
  return (
    <section>
      <header>
        <h2 className="h2 article-title">Trayectoria</h2>
      </header>

      <div className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <FaUniversity />
          </div>
          <h3 className="h3">Educación</h3>
        </div>
        <ol className="timeline-list">
          <TimelineItem
            degree="Ciencias de la Computación"
            place="Universidad de Newcastle"
            date="2021 — Presente"
            grade= "Calificación Upper Second Class (2:1)"
            description="React, Python, MongoDB, SQL, Java"
          />
          <TimelineItem
            place="British School of Gran Canaria"
            date="2006 — 2021"
            description="A Levels en Lengua Castellaña, Química, Matemáticas"
          />
          
        </ol>
      </div>

      <div className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <FaLaptop />
          </div>
          <h3 className="h3">Experiencia Laboral</h3>
        </div>
        <ol className="timeline-list">
          <TimelineItem
            work="Consultor & Desarrollador de Aplicaciones"
            place="TICWAY"
            date="Septiembre 2023 — Presente"
            description="React, Next.JS, Microsoft SQL Server, PowerBI, Python"
          />
          <TimelineItem
            work= "Prácticas IT"
            place= "Bright Network"
            date="Junio 2023 — Julio 2023"
            description=" Figma, Microsoft"
          />
       
        </ol>
      </div>

      <div className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <FaBook />
          </div>
          <h3 className="h3">Cursos</h3>
        </div>
        <ol className="timeline-list">

        <TimelineItem
            work= "Introduction to Generative AI"
            place= "Google Cloud Skills Boost "
            date="Abril 2024"
          />  

        <TimelineItem
            work= "Front End Development Libraries"
            place= "freeCodeCamp"
            date="Abril 2024"
            description=" HTML, Javacript, CSS, React, Bootstrap"
          />
          <TimelineItem
            work="Couch to Coder"
            place="Bright Network Academy"
            date="Agosto 2023 — Septiembre 2023"
            description="Python"
          />
        </ol>
      </div>

  
    </section>
  );
};

export default Resume;
