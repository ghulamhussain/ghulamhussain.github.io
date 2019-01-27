import React from 'react'
import styled from 'styled-components'

import Image from './shared/Image'
import GatsbyImage from './shared/GatsbyImage'
import { UList, ListItem } from './shared/List'
import {
  ContentContainer,
  SectionContainer,
  CenteredContainer,
} from './shared/Containers'

import AboutMeLeftSideBar from '../images/AboutMeLeftSideBar.svg'
import AboutMeRightSideBar from '../images/AboutMeRightSideBar.svg'

import { Heading, Paragraph } from './shared/Typography'

const AboutMeContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`
const AboutDescription = styled.div``

const About = () => (
  <SectionContainer id="about">
    <Image
      src={AboutMeLeftSideBar}
      style={{ position: 'absolute', left: 0, transform: 'translateY(-50px)' }}
      lighten
    />
    <Image
      src={AboutMeRightSideBar}
      style={{ position: 'absolute', right: 0, transform: 'translateY(-50px)' }}
      lighten
    />
    <ContentContainer numColumns={2}>
      <AboutMeContainer>
        <Heading>About Me</Heading>
        <AboutDescription>
          <Paragraph>
            Hello! I’m a software engineer that loves the junction of
            engineering and design. I build experiences with exact attention to
            detail that comes through clean code and solid architecture.
          </Paragraph>
          <Paragraph>
            I have graduated from PUCIT with a Bachelor’s Degree
            in Software Engineering and a focus on engineering and software
            development. I love technology because I’m always learning something
            new.
          </Paragraph>
          <Paragraph>Here are some things I'm experienced with:</Paragraph>
          <UList>
            <ListItem>Javascript</ListItem>
            <ListItem>React</ListItem>
            <ListItem>ReactNative</ListItem>
            <ListItem>Node</ListItem>
            <ListItem>GraphQL</ListItem>
            <ListItem>Material Ui</ListItem>
            <ListItem>BootStrap</ListItem>
            <ListItem>Redux Saga</ListItem>
            <ListItem>LoopBack js</ListItem>
            <ListItem>Gatsby</ListItem>
          </UList>
        </AboutDescription>
      </AboutMeContainer>
      <CenteredContainer>
        <GatsbyImage style={{ height: '100%', width: '100%' }} />
      </CenteredContainer>
    </ContentContainer>
  </SectionContainer>
)

export default About
