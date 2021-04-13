import React from 'react';

function InlineSpinner({ size }: { size?: string | number }): JSX.Element {
  return (
    <span
      style={{ width: size || '.8rem', height: size || '.8rem', verticalAlign: 'middle' }}
      className="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
    />
  );
}

InlineSpinner.defaultProps = {
  size: '1rem',
};

export default InlineSpinner;
