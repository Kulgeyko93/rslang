import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FigureItem from '../../components/FigureItem/FigureItem';
import photoImg from '../../assets/photo/photo.jpg';

const About = (): JSX.Element => (
  <Container fluid>
    <h5>Наша команда</h5>
    <Container>
      <Row>
        <Col lg={4} md={6} sm={6}>
          <FigureItem img={photoImg} text="frontend" name="Иванов Иван" />
        </Col>
        <Col lg={4} md={6} sm={6}>
          <FigureItem img={photoImg} text="backend" name="Иванов Иван" />
        </Col>
        <Col lg={4} md={12} sm={12}>
          <FigureItem img={photoImg} text="frontend" name="Иванов Иван" />
        </Col>
      </Row>
    </Container>
  </Container>
);

export default About;
