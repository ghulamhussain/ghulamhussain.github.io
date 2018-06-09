import React from 'react';

import FaGithub from 'react-icons/lib/fa/github';
import FaTwiiter from 'react-icons/lib/fa/twitter';
import FaLinkedIn from 'react-icons/lib/fa/linkedin';
import FaEnvelope from 'react-icons/lib/fa/envelope';

const Socials = props => {
  const github = 'https://github.com/ghulamhussain';
  const linkedin = 'https://www.linkedin.com/in/ghulam-hussain-676101109';
  const twitter = 'https://twitter.com/glykysmalik';
  const mailto = 'mailto:ghulamhussain23@gmail.com';

  return (
    <div className="Socials">
      <ul className="social-icons">
        <li>
          <a href={github} target="_blank">
            <FaGithub />
          </a>
        </li>
        <li>
          <a href={twitter} target="_blank">
            <FaTwiiter />
          </a>
        </li>
        <li>
          <a href={linkedin} target="_blank">
            <FaLinkedIn />
          </a>
        </li>
        <li>
          <a href={mailto}>
            <FaEnvelope />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Socials;
