import React, { useState, useEffect } from "react";
import { GiMailbox, GiMayanPyramid, GiPhone } from "react-icons/gi";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

const Aside = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showInfoMore, setShowInfoMore] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleInfoMore = (e) => {
    e.preventDefault();
    setShowInfoMore((prev) => !prev);
  };

  const sidebarClass = isMobile ? (showInfoMore ? "active" : "") : "active";

  return (
    <>
      <style>{`
        .sidebar {
          margin-bottom: 15px;
          overflow: hidden;
          transition: all 0.4s ease;
        }

        .sidebar.active {
          max-height: 650px;
        }

        @media (max-width: 768px) {
          .sidebar.active {
            max-height: 405px;
          }
        }

        .sidebar-info {
          position: relative;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 15px;
        }

        .avatar-box {
          background: var(--bg-gradient-onyx);
          border-radius: 20px;
        }

        .avatar-box img {
          border-radius: 20px;
        }

        .info-content .title {
          color: var(--white-1);
          background: var(--grey2);
          font-size: var(--fs-6);
          font-weight: var(--fw-300);
          width: max-content;
          padding: 3px 12px;
          border-radius: 8px;
        }

        .info_more-btn {
          position: absolute;
          top: -15px;
          right: -15px;
          border-radius: 0 15px;
          font-size: 15px;
          background: var(--border-gradient-onyx);
          padding: 10px;
          box-shadow: var(--shadow-2);
          transition: all 0.3s ease;
          z-index: 1;
        }

        .info_more-btn::before {
          content: "";
          position: absolute;
          inset: 1px;
          border-radius: inherit;
          background: var(--bg-gradient-jet);
          z-index: -1;
        }

        .info_more-btn:hover span {
          display: none;
        }
      .info_more-btn svg {
  transition: transform 0.3s ease;
  color: #b4afe9; /* Arrow color */
}

.sidebar.active .info_more-btn svg {
  transform: rotate(180deg);
  color: #b4afe9; /* Keep arrow color when rotated */
}


        .sidebar-info_more {
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s ease;
        }

        .sidebar.active .sidebar-info_more {
          opacity: 1;
          visibility: visible;
        }

        .contacts-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .contact-item {
          min-width: 100%;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .contact-info {
          max-width: calc(120% - 50px);
          width: calc(120% - 50px);
        }

        .contact-title {
          color: var(--light-gray-70);
          font-size: var(--fs-8);
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .contact-info :is(.contact-link, time, address) {
          color: var(--white-2);
          font-size: 11px;
        }

        .contact-info address {
          font-style: normal;
        }

        .social-list {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 15px;
          padding-bottom: 4px;
          padding-left: 7px;
        }

        .social-item .social-link {
          color: var(--light-gray-70);
          font-size: 18px;
        }

        .social-item .social-link:hover {
          color: var(--light-gray);
        }
      `}</style>

      <aside className={`sidebar ${sidebarClass}`}>
        <div className="sidebar-info">
          <figure className="avatar-box">
            <img src="/screen/favicon.ico" alt="Shivani Bhagvanji Rajani" width="80" />
          </figure>

          <div className="info-content">
            <p className="title">Shivani Bhagvanji Rajani</p>
          </div>

          {isMobile ? (
            <a
              href="#!"
              className="info_more-btn"
              onClick={toggleInfoMore}
              aria-expanded={showInfoMore}
              aria-controls="sidebar-info-more"
            >
              <span>Contact</span>
              <FiChevronDown />
            </a>
          ) : (
            <Link to="/contact" className="info_more-btn" data-sidebar-btn>
              <span>Contact</span>
              <FiChevronDown />
            </Link>
          )}
        </div>

        <div className="sidebar-info_more" id="sidebar-info-more">
          <div className="separator"></div>

          <ul className="contacts-list">
            <li className="contact-item">
              <div className="icon-box"><GiMailbox /></div>
              <div className="contact-info">
                <p className="contact-title">Email</p>
                <a href="mailto:shivanibhagvanji@gmail.com" className="contact-link">shivanibhagvanji@gmail.com</a>
              </div>
            </li>

            <li className="contact-item">
              <div className="icon-box"><GiPhone /></div>
              <div className="contact-info">
                <p className="contact-title">PHONE/TELÉFONO</p>
                <a href="tel:+34671026195" className="contact-link">+34 671 02 61 95</a>
              </div>
            </li>

            <li className="contact-item">
              <div className="icon-box">
                <GiMayanPyramid />
              </div>
              <div className="contact-info">
                <p className="contact-title">Address/Dirección</p>
                <address>Newcastle upon Tyne</address>
              </div>
            </li>

            <li className="contact-item">
              <div className="icon-box">
                <FaLinkedin />
              </div>
              <div className="contact-info">
                <p className="contact-title">LinkedIn</p>
                <a href="https://www.linkedin.com/in/shivanibhagvanji/" className="contact-link" target="_blank" rel="noopener noreferrer">Shivani Linkedin</a>
              </div>
            </li>

            <li className="contact-item">
              <div className="icon-box">
                <FaGithub />
              </div>
              <div className="contact-info">
                <p className="contact-title">GitHub</p>
                <a href="https://github.com/shivanirajani/" className="contact-link" target="_blank" rel="noopener noreferrer">Shivani GitHub</a>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Aside;
