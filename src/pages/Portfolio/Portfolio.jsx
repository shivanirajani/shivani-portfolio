import { useState, useEffect } from 'react';
import { FaRegEye, FaGithub, FaVideo } from 'react-icons/fa';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [language, setLanguage] = useState('en');
  const [videoToShow, setVideoToShow] = useState(null);

  // New state for controlling fade animation
  const [fade, setFade] = useState(true);

  useEffect(() => {
    fetch('/projects.json')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        setFilteredProjects(data);
      })
      .catch(error => console.error('Error loading project data:', error));
  }, []);

  const handleFilterClick = (category) => {
    setSelectedCategory(category);
    if (category === 'All' || category === 'Todos') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.category === category);
      setFilteredProjects(filtered);
    }
  };

  const content = {
    en: {
      title: "Portfolio",
      categories: ["All", "Web Development", "UI/UX Design"],
      categoryTranslations: {
        "Web Development": "Web Development",
        "UI/UX Design": "UI/UX Design"
      },
      tooltips: {
        viewProject: "View Project",
        viewRepo: "View Repository",
        watchVideo: "Watch Demo Video"
      }
    },
    es: {
      title: "Portfolio",
      categories: ["Todos", "Desarrollo Web", "Diseño UI/UX"],
      categoryTranslations: {
        "Web Development": "Desarrollo Web",
        "UI/UX Design": "Diseño UI/UX"
      },
      tooltips: {
        viewProject: "Ver Proyecto",
        viewRepo: "Ver Repositorio",
        watchVideo: "Ver Video de Demostración"
      }
    }
  };
  

  // Language change with fade effect
  const changeLanguage = (lang) => {
    if (lang === language) return; // no change

    setFade(false); // start fade-out
    setTimeout(() => {
      setLanguage(lang);
      setFade(true);  // fade-in after content changed
    }, 300); // duration matches CSS transition time
  };

  return (
    <section
      className="portfolio"
      data-page="portfolio"
      style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }}
    >
      <header>
        <h2 className="h2 article-title">{content[language].title}</h2>

        <div style={{ display: "inline-flex", gap: "10px", cursor: "pointer", fontSize: "1.5rem", marginBottom: "20px" }}>
          <span onClick={() => changeLanguage('en')} style={{ opacity: language === 'en' ? 1 : 0.5 }}>🇬🇧</span>
          <span onClick={() => changeLanguage('es')} style={{ opacity: language === 'es' ? 1 : 0.5 }}>🇪🇸</span>
        </div>
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
          {filteredProjects.map(project => (
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

                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={content[language].tooltips.viewRepo}
                    className="icon-link"
                  >
                    <FaGithub size={20} />
                  </a>

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
        }
      `}</style>
    </section>
  );
};

export default Portfolio;

