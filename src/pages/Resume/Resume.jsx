import React from 'react';
import { FaBook, FaLaptop, FaUniversity, FaHandsHelping } from "react-icons/fa";
import TimelineItem from './TimelineItem';

const Resume = () => {
  return (
    <section>
      <header>
        <h2 className="h2 article-title">Career Path</h2>
      </header>

      <div className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <FaUniversity />
          </div>
          <h3 className="h3">Education</h3>
        </div>
        <ol className="timeline-list">
          <TimelineItem
            degree="Computer Science"
            place="Newcastle University"
            date="2021 — Present"
            description="React, Python, MongoDB, SQL, Java"
          />
          <TimelineItem
            place="British School of Gran Canaria"
            date="2006 — 2021"
            description="A Levels in Spanish, Chemistry, Mathematics"
          />
        </ol>
      </div>

      <div className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <FaLaptop />
          </div>
          <h3 className="h3">Work Experience</h3>
        </div>
        <ol className="timeline-list">
          <TimelineItem
            work="Full Stack Developer"
            place="Lãberit"
            date="September 2024 — Present"
            description="Angular, Figma, Python Flask, MySQL, SCSS, HTML, JavaScript"
          />
          <TimelineItem
            work="Frontend Developer"
            place="Lãberit"
            date="June 2024 — August 2024"
            description="Angular, Figma, Python Flask, MySQL, SCSS, HTML, JavaScript"
          />
          <TimelineItem
            work="Consultant & Application Developer"
            place="TICWAY"
            date="September 2023 — July 2024"
            description="React, Next.JS, Microsoft SQL Server, PowerBI, Python"
          />
          <TimelineItem
            work="IT Intern"
            place="Bright Network"
            date="June 2023 — July 2023"
            description="Figma, Microsoft"
          />
        </ol>
      </div>

      <div className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <FaBook />
          </div>
          <h3 className="h3">Courses</h3>
        </div>
        <ol className="timeline-list">
          <TimelineItem
            work="PHP for Beginners"
            place="Great Learning Academy"
            date="April 2024"
            description="PHP"
          />
          <TimelineItem
            work="Introduction to Generative AI"
            place="Google Cloud Skills Boost"
            date="April 2024"
          />
          <TimelineItem
            work="Front End Development Libraries"
            place="freeCodeCamp"
            date="April 2024"
            description="HTML, JavaScript, CSS, React, Bootstrap"
          />
          <TimelineItem
            work="Couch to Coder"
            place="Bright Network Academy"
            date="August 2023 — September 2023"
            description="Python"
          />
        </ol>
      </div>

      {/* New Volunteering Section */}
      <div className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <FaHandsHelping />
          </div>
          <h3 className="h3">Volunteering</h3>
        </div>
        <ol className="timeline-list">
          <TimelineItem
            work="Peer Mentor for Computer Science"
            place="Newcastle University"
            date="September 2024 — Present"
            description="Support the academic and personal development of fresher students by creating an inclusive and engaging environment. Utilise this role to positively impact their transition into university life, promoting a strong sense of community and belonging"
          />
       <TimelineItem
            work="President of Bollywood Dance Society"
            place="Newcastle University"
            date="September 2024 — Present"
            description={`Leading the society by overseeing and coordinating all activity\nPlanning for dance classes, workshops, performances and competitions\nDelegating and managing tasks`}
          />
          <TimelineItem
            work="Secretary of Bollywood Dance Society"
            place="Newcastle University"
            date="September 2023 — August 2024"
            description={`Attending committee meetings, taking and distributing minutes\n Monitoring the society email account\nGeneral administrative tasks, such as filling out risk assessments or booking rooms`}
          />
        </ol>
      </div>
    </section>
  );
};

export default Resume;

