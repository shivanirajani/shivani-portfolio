import { useState, useEffect } from 'react';
import { FaRegEye } from 'react-icons/fa';

const Portfolio = () => {
  // State to store project data, filtered projects, and selected category
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [language, setLanguage] = useState('en'); // State for language toggle

  // Load project data from projects.json
  useEffect(() => {
    fetch('/projects.json')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        setFilteredProjects(data);
      })
      .catch(error => console.error('Error loading project data:', error));
  }, []);

  // Function to handle category filter selection
  const handleFilterClick = (category) => {
    setSelectedCategory(category);
    if (category === 'All' || category === 'Todos') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.category === category);
      setFilteredProjects(filtered);
    }
  };

  // Text content for both languages
  const content = {
    en: {
      title: "Portfolio",
      categories: ["All", "Web Development", "UI/UX Design"]
    },
    es: {
      title: "Portfolio",
      categories: ["Todos", "Desarrollo Web", "Diseño UI/UX"]
    }
  };

  return (
    <section className="portfolio" data-page="portfolio">
      <header>
        <h2 className="h2 article-title">{content[language].title}</h2>

        {/* Language toggle */}
        <div style={{ display: "inline-flex", gap: "10px", cursor: "pointer", fontSize: "1.5rem", marginBottom: "20px" }}>
          <span onClick={() => setLanguage('en')} style={{ opacity: language === 'en' ? 1 : 0.5 }}>🇬🇧</span>
          <span onClick={() => setLanguage('es')} style={{ opacity: language === 'es' ? 1 : 0.5 }}>🇪🇸</span>
        </div>
      </header>

      {/* Filter buttons */}
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

      {/* Portfolio items */}
      <section className="projects">
        <ul className="project-list">
          {filteredProjects.map(project => (
            <li
              className="project-item active"
              data-filter-item
              data-category={project.category}
              key={project.id}
            >
              <a href={project.url}>
                <figure className="project-img">
                  <div className="project-item-icon-box">
                    <FaRegEye />
                  </div>
                  <img src={project.image} alt={project.title} loading="lazy" />
                </figure>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-category">{project.category}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default Portfolio;
