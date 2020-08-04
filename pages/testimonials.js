import React from 'react';
import { RichText } from 'prismic-reactjs';
import { client, hrefResolver, linkResolver } from '../prismic-configuration';
import { Col, Row, Card } from 'antd';
import { Section, PageHeader } from '../components/Blocks';

const Testimonials = (props) => {
  return(
    <Section>
      <PageHeader>
        <h1>{RichText.asText(props.testimonials.data.header)}</h1>
      </PageHeader>
      <Row gutter={[16, 16]}>
        {props.testimonials.data.testimonial_group.map((testimonial) => (
          <Col key={RichText.asText(testimonial.author)} xs={24} sm={12}>
            <Card>
              <p><q>{RichText.asText(testimonial.quote)}</q></p>
              <p><b>&ndash; {RichText.asText(testimonial.author)}</b></p>
            </Card>
          </Col>
        ))}
      </Row>
    </Section>
  );
}

Testimonials.getInitialProps = async context => {
  const testimonials = await client.getSingle('testimonials');
  return { testimonials }
}

export default Testimonials;