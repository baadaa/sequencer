import * as React from 'react';

export const IconPlay: React.FC<React.SVGAttributes<SVGElement>> = ({
  width = 24,
  height = 24,
}) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
  >
    <path d="M24 12L5 0V24L24 12Z" fill="var(--wrapper-bg)" />
  </svg>
);
