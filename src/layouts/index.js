import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import Socials from './socials';

import '../scss/styles.scss';

const ListLink = props => (
  <li>
    <Link activeClassName="active" to={props.to}>
      {props.children}
    </Link>
  </li>
);

const Navigation = () => (
  <nav className="Navigation">
    <ul className="nav-list">
      <ListLink to="/">Home</ListLink>
      {/* <ListLink to="/projects/">Projects</ListLink> */}
      {/* <ListLink to="/blog/">Blog</ListLink> */}
    </ul>
  </nav>
);

const Header = () => (
  <div className="Header">
    <Link className="logo-link" to="/">
      <div className="diamond" />
      <div className="name">Ghulam Hussain Khokhar</div>
    </Link>
    <Navigation />
  </div>
);

const TemplateWrapper = ({ children }) => {
  return (
    <div className="">
      <Helmet
        title="Ghulam Hussain - Full Stack Developer"
        meta={[
          {
            name: 'description',
            content: 'Ghulam Hussain - Full Stack Developer - Lahore - Pakistan'
          },
          {
            name: 'keywords',
            content:
              'Ghulam Hussain, Lahore, Full Stack Developer, reactjs, react, nodejs , loopbackjs , reactnative , css, scss, sass,gatsbyjs, gatsby, frontend, '
          }
        ]}
      />
      <Header />
      <div className="content-container">{children()}</div>
    </div>
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
