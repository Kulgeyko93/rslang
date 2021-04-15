import React from 'react';

const ScrollToTopOnMount = (): null => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};
export default ScrollToTopOnMount;
