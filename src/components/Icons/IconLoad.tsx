import * as React from 'react';

export const IconLoad: React.FC<React.SVGAttributes<SVGElement>> = ({
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
      d="M4.58391 0.252908L7.44855 3.17735C8.2541 3.98529 7.04558 5.19762 6.23964 4.38968L5.2591 3.40255C5.03589 3.17775 4.85473 3.25228 4.85473 3.56896V7.49925C4.85473 7.96879 4.47208 8.35424 4.00015 8.35424C3.52901 8.35424 3.14537 7.97139 3.14537 7.49925L3.14537 3.56896C3.14537 3.25387 2.96441 3.17774 2.741 3.40255L1.76025 4.38967C0.954497 5.19762 -0.254208 3.9853 0.55134 3.17735L3.3865 0.256888C3.71792 -0.0845041 4.25284 -0.0850948 4.58391 0.252908Z"
      fill="var(--input-icon)"
    />
    <path
      d="M0 11C0 10.4477 0.447715 9.99999 1 9.99999H7C7.55228 9.99999 8 10.4477 8 11C8 11.5523 7.55228 12 7 12H1C0.447715 12 0 11.5523 0 11Z"
      fill="var(--input-icon)"
    />
  </svg>
);