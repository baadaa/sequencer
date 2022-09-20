import * as React from 'react';

export const IconTrash: React.FC<React.SVGAttributes<SVGElement>> = ({
  width = 24,
  height = 24,
}) => (
  <svg
    viewBox="0 0 23 24"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
  >
    <path
      d="M3.05684 22.5599C3.13262 23.3936 3.81478 24 4.64846 24H17.7347C18.5684 24 19.2506 23.3684 19.3263 22.5599L20.7916 7.19995H1.59167L3.05684 22.5599Z"
      fill="var(--wrapper-bg)"
    />
    <path
      d="M20.7915 2.39995H14.3999V1.59162C14.3999 0.707321 13.6926 0 12.8083 0H9.59988C8.71558 0 8.00826 0.707366 8.00826 1.59162L8.00844 2.39995H1.59162C0.707321 2.39995 0 3.10731 0 3.99156C0 4.87586 0.707366 5.58318 1.59162 5.58318H20.7915C21.6758 5.58318 22.3832 4.87582 22.3832 3.99156C22.383 3.10727 21.6756 2.39995 20.7915 2.39995H20.7915Z"
      fill="var(--wrapper-bg)"
    />
    <rect
      x="7.56812"
      y="10.0001"
      width="12.1966"
      height="2.21757"
      rx="1.10879"
      transform="rotate(45 7.56812 10.0001)"
      fill="var(--trash-btn)"
    />
    <rect
      x="16.1924"
      y="11.5681"
      width="12.1966"
      height="2.21757"
      rx="1.10879"
      transform="rotate(135 16.1924 11.5681)"
      fill="var(--trash-btn)"
    />
  </svg>
);
