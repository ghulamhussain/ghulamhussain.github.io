import React from "react";
import styled from "styled-components";

import Image from "./shared/Image";
import { Heading, Paragraph } from "./shared/Typography";
import { SectionContainer, ContentContainer } from "./shared/Containers";

import { BORDER_RADIUS, SHADOW, TRANSITION, COLORS } from "../styles/constants";
import Link from "./shared/Link";

import MediumLogo from "../images/logos/medium.png";
import GithubLogo from "../images/logos/github.png";
import LinkedinLogo from "../images/logos/linkedin.png";
import TwitterLogo from "../images/logos/twitter.png";

const Description = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const ContactCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-gap: 30px;
  align-items: center;
  justify-items: center;
`;
const ContactCard = styled.div`
  box-shadow: ${SHADOW};
  border-radius: ${BORDER_RADIUS.card};
  padding: 20px;
  max-height: 100px;
  max-width: 100px;
  transition: ${TRANSITION};
  &:hover {
    transform: scale(1.06);
    cursor: pointer;
  }
`;
const ContactCardImage = styled(Image)`
  height: 60px;
  width: 60px;
  background-color: ${COLORS.lightGray};
  border-radius: 8px;
`;

const contactLinks = [
  { profile: "https://github.com/ghulamhussain", logo: GithubLogo },
  {
    profile: "https://www.linkedin.com/in/ghulam-hussain-676101109/",
    logo: LinkedinLogo
  },
  { profile: "https://twitter.com/glykysmalik", logo: TwitterLogo },
  { profile: "https://medium.com/@Ghulamhussain", logo: MediumLogo }
];

class Contact extends React.Component {
  openLink = link => {
    console.log("opening...");
    let newPage = window.open(link, "_blank");
    newPage.focus();
  };

  render() {
    return (
      <SectionContainer id="contact">
        {/* <Image
          src={HeroLeftSideBar}
          style={{ position: 'absolute', left: 0 }}
          lighten
        /> */}
        <ContentContainer style={{ gridGap: 30 }} numColumns={1}>
          <Description>
            <Heading>Contact</Heading>
            <Paragraph size="xlarge" weight="bold">
              Get in contact via{" "}
              <Link
                style={{ color: COLORS.black }}
                href="mailto:ghulamhussain23@gmail.com"
              >
                email
              </Link>{" "}
              or find me online
            </Paragraph>
          </Description>
          <ContactCards>
            {contactLinks.map(node => (
              <ContactCard onClick={() => this.openLink(node.profile)}>
                <ContactCardImage src={node.logo} />
              </ContactCard>
            ))}
          </ContactCards>
        </ContentContainer>
      </SectionContainer>
    );
  }
}

export default Contact;
