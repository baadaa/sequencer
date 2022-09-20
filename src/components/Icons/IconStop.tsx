import * as React from 'react';

export const IconStop: React.FC<React.SVGAttributes<SVGElement>> = ({
  width = 18,
  height = 18,
}) => (
  <svg
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
  >
    <rect width="18" height="18" fill="var(--wrapper-bg)" />
  </svg>
);
