import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AUTHORS } from '../../constants/authors';
import rs_school from '../../assets/icons/rs_school_js.svg';
import styles from './Footer.module.css';

const Footer = (): JSX.Element => (
  <div>
    <hr className={styles.color} />
    <Container fluid>
      <Row>
        <Col className={styles.flex} lg={6} md={6} sm={6} xs={12}>
          <a className={styles.link} href="https://rs.school/js/">
            <img className={styles.img} src={rs_school} alt="логотип rs_school" />
          </a>
          <span className={styles.bold}>2021</span>
        </Col>
        <Col className={styles.flex} lg={6} md={6} sm={6} xs={12}>
          {AUTHORS.map((author) => (
            <div className={styles.right} key={author.name}>
              <a className={styles.link} href={author.github}>
                <span>{author.name}</span>
              </a>
            </div>
          ))}
        </Col>
        <Col className={styles.flex} lg={12}>
          <small>
            Векторные изображения созданы{' '}
            <a className={styles.link} href="https://ru.freepik.com/vectors/business">
              pch.vector и svstudioart - ru.freepik.com
            </a>
          </small>
          <small>
            Иконки созданы{' '}
            <a className={styles.link} href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">
              Pixel perfect
            </a>{' '}
            from{' '}
            <a className={styles.link} href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </small>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Footer;
