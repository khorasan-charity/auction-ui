import React from "react";
import type { SVGProps } from "react";

export function Coin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      {...props}
    >
      <g fill="none">
        <circle cx={16} cy={16} r={16} fill="#f1b32b"></circle>
        <path
          fill="#fff"
          d="M15.75 4C9.26 4 4 9.26 4 15.75S9.26 27.5 15.75 27.5S27.5 22.24 27.5 15.75A11.75 11.75 0 0 0 15.75 4m0 20.57a8.82 8.82 0 1 1 0-17.64a8.82 8.82 0 0 1 0 17.64m-2.93-8.81l2.94 4.4l2.92-4.4l-2.92-4.41z"
        ></path>
      </g>
    </svg>
  );
}
