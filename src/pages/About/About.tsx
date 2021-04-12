import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FigureItem from '../../components/FigureItem/FigureItem';
import photoImg1 from '../../assets/photo/1.jpg';
import photoImg2 from '../../assets/photo/2.jpg';
import photoImg3 from '../../assets/photo/3.jpg';

const margin = {
  marginBottom: '2rem',
};
const height = {
  minHeight: 'calc(100vh - 116px - 142px - 50px)',
};

const About = (): JSX.Element => (
  <div style={height}>
    <Container fluid>
      <h4 style={margin}>Наша команда</h4>
      <Container>
        <Row>
          <Col lg={4} md={6} sm={6}>
            <FigureItem img={photoImg1} text="team lead, frontend" name="Алексей Кульгейко" />
          </Col>
          <Col lg={4} md={6} sm={6}>
            <FigureItem img={photoImg2} text="backend, frontend" name="Азимжон Бурхонов" />
          </Col>
          <Col lg={4} md={12} sm={12}>
            <FigureItem img={photoImg3} text="дизайн, frontend" name="Евгения Куринёва" />
          </Col>
        </Row>
      </Container>
    </Container>
  </div>
);

export default About;
