import { useState, useEffect } from 'react';
import { FaRegEye, FaGithub, FaVideo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [language, setLanguage] = useState('en');
  const [videoToShow, setVideoToShow] = useState(null);
  const [fade, setFade] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('/projects.json')
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        setFilteredProjects(data);
      })
      .catch((error) => console.error('Error loading project data:', error));
  }, []);

  const content = {
  en: {
    title: "Portfolio",
    categories: ["All", "Web Development", "Data Science", "UI/UX"],
    categoryTranslations: {
      "Web Development": "Web Development",
      "Data Science": "Data Science",
      "UI/UX": "UI/UX"
    },
    tooltips: {
      viewProject: "View Project",
      viewRepo: "View Repository",
      watchVideo: "Watch Demo Video"
    }
  },
  es: {
    title: "Portfolio",
    categories: ["Todos", "Desarrollo Web", "Ciencia de Datos", "UI/UX"],
    categoryTranslations: {
      "Web Development": "Desarrollo Web",
      "Data Science": "Ciencia de Datos",
      "UI/UX": "UI/UX"
    },
    tooltips: {
      viewProject: "Ver Proyecto",
      viewRepo: "Ver Repositorio",
      watchVideo: "Ver Video de Demostración"
    }
  }
};


  // Fix filtering to handle translations
  const handleFilterClick = (category) => {
    setSelectedCategory(category);

    if (category === content[language].categories[0]) {
      // "All" or "Todos"
      setFilteredProjects(projects);
    } else {
      // Map translated category back to project category
      const projectCategory = Object.entries(content[language].categoryTranslations)
        .find(([key, value]) => value === category)?.[0] || category;

      const filtered = projects.filter((project) => project.category === projectCategory);
      setFilteredProjects(filtered);
    }
  };

  const toggleLanguage = () => {
    setFade(false);
    setTimeout(() => {
      setLanguage((prevLang) => (prevLang === 'en' ? 'es' : 'en'));
      setFade(true);
    }, 300);
  };

  return (
    <section
      className="portfolio"
      data-page="portfolio"
      style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }}
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
            display: "flex",
            alignItems: "center",
            gap: "0.5em",
            fontWeight: "600",
          }}
          aria-label="Toggle Language"
          type="button"
        >
          <span style={{ fontSize: "1.2em" }}>
            {language === "en" ? "🇪🇸" : "🇬🇧"}
          </span>
          {language === "en" ? "Cambiar a Español" : "Change to English"}
        </button>
      </header>

      <ul className="filter-list">
        {content[language].categories.map((category) => (
          <li className="filter-item" key={category}>
            <button
              className={category === selectedCategory ? 'active' : ''}
              onClick={() => handleFilterClick(category)}
              data-filter-btn
            >
              {category}
            </button>
          </li>
        ))}
      </ul>

      <section className="projects">
        <ul className="project-list">
          {filteredProjects.map((project) => (
            <li
              className="project-item active"
              data-filter-item
              data-category={project.category}
              key={project.id}
            >
              <div className="project-image-container">
                <figure>
                  <img
                    src={project.image}
                    alt={project.title[language]}
                    loading="lazy"
                    className="project-image"
                  />
                </figure>

                <div className="project-icons">
                  {project.url && project.id !== 3 && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={content[language].tooltips.viewProject}
                      className="icon-link"
                    >
                      <FaRegEye size={20} />
                    </a>
                  )}

                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={content[language].tooltips.viewRepo}
                      className="icon-link"
                    >
                      <FaGithub size={20} />
                    </a>
                  )}

                  {project.video && (
                    <button
                      onClick={() => setVideoToShow(project.video)}
                      title={content[language].tooltips.watchVideo}
                      className="icon-button"
                    >
                      <FaVideo size={20} />
                    </button>
                  )}
                </div>
              </div>

              <h3 className="project-title">{project.title[language]}</h3>
              <p className="project-category">
                {content[language].categoryTranslations[project.category] || project.category}
              </p>

              <p className="project-description" style={{ marginLeft: '10px' }}>
                {project.description[language]}
              </p>

              <ul className="tech-stack-list" style={{ marginLeft: '10px' }}>
                {project.techStack.map((tech, index) => (
                  <li key={index} className="tech-stack-item">{tech}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>


      {videoToShow && (
        <div
          className="video-modal"
          onClick={() => setVideoToShow(null)}
        >
          <video
            src={videoToShow}
            controls
            autoPlay
            className="video-player"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}

      <style>{`
        .project-image-container {
          position: relative;
          display: inline-block;
        }
        .project-image {
          height: 150px;
          display: block;
          border-radius: 8px;
          object-fit: cover;
        }
        .project-category{
          color: #b4afe9;
        }
        .project-icons {
          position: absolute;
          top: 10px;
          right: 10px;
          display: flex;
          gap: 10px;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 8px;
          padding: 5px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .project-image-container:hover .project-icons {
          opacity: 1;
          pointer-events: auto;
        }
        .icon-link,
        .icon-button {
          color: #b4afe9;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }
        .icon-button:focus,
        .icon-link:focus {
          outline: 2px solid #b4afe9;
          outline-offset: 2px;
        }
        .video-modal {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .video-player {
          max-width: 90%;
          max-height: 90%;
          border-radius: 8px;
        }
        .project-description {
          margin-top: 8px;
          font-size: 0.9rem;
          color: white;
        }
        .tech-stack-list {
          margin-top: 10px;
          padding-left: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          list-style: none;
          font-weight: 500;
        }
        .tech-stack-item {
          background-color: #b4afe9;
          color: #fff;
          font-size: 0.8rem;
          padding: 3px 8px;
          border-radius: 12px;
        }
        .filter-list {
          display: flex;
          gap: 10px;
          list-style: none;
          padding: 0;
          margin-bottom: 20px;
        }
        .filter-item button {
          padding: 6px 12px;
          border: none;
          background: transparent;
          color: #b4afe9;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }
        .filter-item button.active,
        .filter-item button:hover {
          background-color: #b4afe9;
          color: white;
        }
        .project-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          padding: 0;
          list-style: none;
        }
        @media (min-width: 768px) {
          .project-list {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .project-item {
          background-color:rgba(37, 37, 37, 0.35);
          border-radius: 12px;
          padding: 16px;
          box-shadow: transparent 0 0 0 1px, rgba(0, 0, 0, 0.1) 0 2px 4px;
        }
      `}</style>
    </section>
  );
};

export default Portfolio;
