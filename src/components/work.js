import React from "react";
import styled from "styled-components";

import Image from "./shared/Image";
import { Heading, Paragraph } from "./shared/Typography";
import {
  SectionContainer,
  ContentContainer,
  CardGrid
} from "./shared/Containers";
import ProjectCard from "./ProjectCard";

import WorkRightSideBarSVG from "../images/WorkRightSideBar.svg";
import WorkLeftSideBarSVG from "../images/WorkLeftSideBar.svg";

import CardSurgeIcon from "../images/CardSurgeIcon.svg";
import SyntheticIcon from "../images/SyntheticIcon.svg";
import MoreIcon from "../images/MoreIcon.svg";
import EmojiZooIcon from "../images/EmojiZooIcon.svg";

const Description = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Hero = () => (
  <SectionContainer id="projects">
    <Image
      src={WorkLeftSideBarSVG}
      style={{ position: "absolute", left: 0 }}
      lighten
    />
    <Image
      src={WorkRightSideBarSVG}
      style={{ position: "absolute", right: 0 }}
      lighten
    />
    <ContentContainer style={{ gridGap: 30 }} numColumns={1}>
      <Description>
        <Heading>Projects</Heading>
        <Paragraph size="xlarge" weight="bold">
          Some things I've worked on
        </Paragraph>
      </Description>
      <CardGrid>
        <ProjectCard
          icon={SyntheticIcon}
          title="Mevris"
          desc="Universal home automation IoT based platform enabling users to personalize their dwelling regardless of geographical barriers."
          link="https://mevris.io"
        />
        <ProjectCard
          icon={CardSurgeIcon}
          title="Hubii core"
          desc="Crypto Asset manager"
          link="https://www.hubii.com/"
        />
        <ProjectCard
          icon={EmojiZooIcon}
          title="Caterbee"
          desc="Enterprise Catering Solution. Catering to your company"
          link="https://caterbee.com/"
        />
        <ProjectCard
          icon={MoreIcon}
          title="More"
          desc="I’ve made all sorts of apps, and microservices that live on my Github"
          link="https://github.com/ghulamhussain"
        />
      </CardGrid>
    </ContentContainer>
  </SectionContainer>
);

export default Hero;
