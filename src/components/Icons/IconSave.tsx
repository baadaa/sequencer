import * as React from 'react';

export const IconSave: React.FC<React.SVGAttributes<SVGElement>> = ({
  width = 8,
  height = 12,
}) => (
  <svg
    viewBox="0 0 8 12"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.41603 8.10145L0.55139 5.17701C-0.254158 4.36906 0.954362 3.15674 1.7603 3.96468L2.74084 4.95181C2.96405 5.17661 3.14521 5.10208 3.14521 4.7854V0.855108C3.14521 0.38557 3.52786 0.00012207 3.99979 0.00012207C4.47092 0.00012207 4.85457 0.382968 4.85457 0.855108V4.7854C4.85457 5.10048 5.03553 5.17662 5.25894 4.95181L6.23969 3.96468C7.04544 3.15674 8.25415 4.36905 7.4486 5.17701L4.61344 8.09747C4.28201 8.43886 3.7471 8.43945 3.41603 8.10145Z"
      fill="var(--input-icon)"
    />
    <path
      d="M0 11C0 10.4477 0.447715 10 1 10H7C7.55228 10 8 10.4477 8 11C8 11.5523 7.55228 12 7 12H1C0.447715 12 0 11.5523 0 11Z"
      fill="var(--input-icon)"
    />
  </svg>
);
