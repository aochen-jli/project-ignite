import React from "react";
import Head from "next/head";
import { RichText } from "prismic-reactjs";
import styled from "styled-components";
import { client, hrefResolver, linkResolver } from "../prismic-configuration";
import { Card, Button, Space, Divider, Row, Col } from "antd";

import { CenteredText, RoundedButton, StyledCard } from "../components/Blocks";

const Landing = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 95vh;
  
  h1 {
    white-space: nowrap;
    font-size: 2.75em;
    margin: 0;
  }

  div {
    padding: 25px 50px 50px 50px;
    /* TODO: change based upon the logo padding */
  }

  img {
    width: auto;
    height: 30%;
  }
  
  @media (min-width: 992px) {
    flex-direction: row;
    text-align: left;
    
      h1 {
        font-size: 3.5em;
      }

      p {
        font-size: 1.25em;
      }
    
    img {
      width: 50%;
      height: auto;
      max-height: 350px;
    }
    
    div {
      padding: 50px;
    }
  }
`;

const ImageCard = styled(StyledCard)`
  img {
    width: 100%;
    height: 350px;
    border-radius: 0.5em;
    object-fit: cover;
    margin-bottom: 1.5em;
  }
`;

const Homepage = (props) => {
  return (
    <>
      <Head>
        <title>Home &#124; Project Ignite</title>
      </Head>
      <Landing>
        <div>
          <h1>{RichText.asText(props.home.data.title)}</h1>
          <p>{RichText.asText(props.home.data.subtitle)}</p>
          {RichText.render(props.home.data.subtitle_2)}
          <RoundedButton type="primary" size="large" href="#register">
            {RichText.asText(props.home.data.action_button_text)}
          </RoundedButton>
        </div>
        <img src={props.home.data.banner.url} alt={props.home.data.banner.alt} />
      </Landing>
      <Divider />

      {/* info groups */}
      <Row gutter={[16, 16]}>
        {props.home.data.info_group.map((group) => (
          <Col key={RichText.asText(group.header)} xs={24} md={12}>
            <ImageCard title={RichText.asText(group.header)} bordered={false}>
              <CenteredText>
                <img src={group.image.url} alt={group.image.alt} />
              </CenteredText>
              <p>{RichText.asText(group.body)}</p>
            </ImageCard>
          </Col>
        ))}
      </Row>
      <Divider />

      {/* action groups */}
      <Row gutter={[16, 16]} id="register">
        {props.home.data.action_group.map((group) => (
          <Col span={24} key={RichText.asText(group.header)}>
            <StyledCard title={RichText.asText(group.header)}>
              <p>{RichText.asText(group.body)}</p>
              <CenteredText>
                <RoundedButton
                  size="large"
                  type="primary"
                  href={group.button_link.url}
                  target="_blank"
                >
                  {RichText.asText(group.button_text)}
                </RoundedButton>
              </CenteredText>
            </StyledCard>
          </Col>
        ))}
      </Row>
    </>
  );
};

Homepage.getInitialProps = async (context) => {
  const home = await client.getSingle("homepage");
  return { home };
};

export default Homepage;
