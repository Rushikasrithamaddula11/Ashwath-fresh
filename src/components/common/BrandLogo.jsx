import React from 'react';

export const BrandLogo = ({ src, className = '', alt = 'Ashwath Fresh' }) => (
  <img
    src={src || '/logo.svg'}
    alt={alt}
    className={`object-contain ${className}`}
  />
);

export default BrandLogo;