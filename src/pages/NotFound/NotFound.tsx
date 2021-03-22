import React from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

const NotFound = (): JSX.Element => {
  const location = useLocation();
  return (
    <Container fluid>
      <h5>
        К сожалению, для вашего запроса <code>{location.pathname}</code> ничего не найдено.
      </h5>
    </Container>
  );
};

export default NotFound;
