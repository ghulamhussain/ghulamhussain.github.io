import React from 'react';
import Link from 'gatsby-link';
import image from '../../public/static/me.jpeg';

import Socials from '../layouts/socials';
//
// Home page of portfolio site
//
const IndexPage = ({ data }) => {
  const homepage = data.wordpressPage;
  const profileImage = data.wordpressPage.acf.profile_image.source_url;

  return (
    <div className="front-page">
      <div className="card-wrap">
        <div className="image-wrap">
          <div className="mask">
            <div
              className="profile-image"
              style={{ backgroundImage: 'url(' + image + ')' }}
            />
          </div>
        </div>
        <div className="content">
          {/* <div
            className="inner"
            dangerouslySetInnerHTML={{ __html: homepage.content }}
          /> */}
          <div style={{ color: '#FF8201' }}>{'Ghulam Hussain'}</div>
          <div>{'Full Stack Developer'}</div>
          <Socials />
        </div>
      </div>
    </div>
  );
};

export default IndexPage;

// Pull the homepage content from Wordpress
export const homePageQuery = graphql`
  query homePageQuery {
    wordpressPage(slug: { eq: "home-page" }) {
      id
      title
      content
      acf {
        profile_image {
          source_url
        }
      }
    }
  }
`;
