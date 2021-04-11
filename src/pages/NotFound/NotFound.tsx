import React from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

const height = {
  minHeight: 'calc(100vh - 116px - 142px - 100px)',
};
const margin = {
  marginTop: '2rem',
};

const NotFound = (): JSX.Element => {
  const location = useLocation();
  return (
    <div style={height}>
      <Container fluid>
        <h5 style={margin}>
          К сожалению, для вашего запроса <code>{location.pathname}</code> ничего не найдено.
        </h5>
      </Container>
    </div>
  );
};

export default NotFound;
