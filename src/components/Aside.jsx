import { GiClawSlashes, GiMailbox, GiMayanPyramid, GiPhone } from "react-icons/gi";
import { FaLinkedin, FaGithub } from "react-icons/fa"; // Added FaGithub import

import { Link } from 'react-router-dom';

const Aside = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-info">
        <figure className="avatar-box">
          <img
            src="/screen/s logo.png"
            alt="Shivani Bhagvanji Rajani"
            width="80"
          />
        </figure>

        <div className="info-content">
        

          <p className="title">Shivani Bhagvanji Rajani</p>
        </div>

        <Link to="/contact" className="info_more-btn" data-sidebar-btn>
          <span>Contact</span>
          <GiClawSlashes />
        </Link>
      </div>

      <div className="sidebar-info_more">
        <div className="separator"></div>

        <ul className="contacts-list">
          <li className="contact-item">
            <div className="icon-box">
              <GiMailbox />
            </div>

            <div className="contact-info">
              <p className="contact-title">Email</p>

              <a href="mailto:shivanibhagvanji@gmail.com" className="contact-link">
                shivanibhagvanji@gmail.com
              </a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <GiPhone />
            </div>

            <div className="contact-info">
              <p className="contact-title">PHONE/TELÉFONO</p>

              <a href="tel:+34671026195" className="contact-link">
                +34 671 02 61 95
              </a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <GiMayanPyramid />
              <ion-icon name="location-outline"></ion-icon>
            </div>

            <div className="contact-info">
              <p className="contact-title">Address/Dirección</p>

              <address>Newcastle upon Tyne</address>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <FaLinkedin />
              <ion-icon name="linkedin-outline"></ion-icon>
            </div>

            <div className="contact-info">
              <p className="contact-title">LinkedIn</p>

              <a href="https://www.linkedin.com/in/shivanibhagvanji/" className="contact-link">
                Shivani Linkedin
              </a>
            </div>
          </li>

          <li className="contact-item"> {/* Added missing opening tag for list item */}
            <div className="icon-box">
              <FaGithub />
              <ion-icon name="github-outline"></ion-icon>
            </div>

            <div className="contact-info">
              <p className="contact-title">GitHub</p>

              <a href="https://github.com/shivanirajani/" className="contact-link">
                Shivani GitHub
              </a>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
