import { useEffect, useState } from "react";

export type HeartProps = {
  fillPercent: number;
  noBeating?: boolean;
};

export function Heart(props: HeartProps) {
  const [rect1Y, setRect1Y] = useState(24 * 0.5);
  const [rect2Y, setRect2Y] = useState(24 * 0.57);
  const [rect3Y, setRect3Y] = useState(24 * 0.6);
  const [rect1Radius, setRect1Radius] = useState(32.4);
  const [rect2Radius, setRect2Radius] = useState(30.96);
  const [rect3Radius, setRect3Radius] = useState(28.8);

  useEffect(() => {
    // setRect1Y(24 - 24 * props.fillPercent);
    // setRect2Y(24 - 24 * (props.fillPercent - 0.02)); // 0.07
    // setRect3Y(24 - 24 * (props.fillPercent - 0.04)); // 0.1
    setRect1Y(24 - 24 * (props.fillPercent - 0.1)); // 0
    setRect2Y(24 - 24 * (props.fillPercent - 0.107)); // 0.07
    setRect3Y(24 - 24 * (props.fillPercent - 0.12)); // 0.1
  }, [props.fillPercent]);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transformOrigin: "center" }}
    >
      <defs>
        <clipPath id="heartClipPath">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </clipPath>
      </defs>
      <g style={{ transformOrigin: "center" }}>
        <g clipPath="url(#heartClipPath)">
          <rect
            x="-24"
            y={rect1Y}
            width="72"
            height="72"
            rx={rect1Radius}
            ry={rect1Radius}
            stroke="#fff"
            strokeWidth={0.04}
            fill="#f68682cc"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 12 ${36 + rect1Y}`}
              to={`360 12 ${36 + rect1Y}`}
              dur="14s"
              repeatCount="indefinite"
            />
          </rect>
          <rect
            x="-24"
            y={rect2Y}
            width="72"
            height="72"
            rx={rect2Radius}
            ry={rect2Radius}
            stroke="#fff"
            strokeWidth={0.04}
            fill="#f54e47cc"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 12 ${36 + rect2Y}`}
              to={`360 12 ${36 + rect2Y}`}
              dur="13s"
              repeatCount="indefinite"
            />
          </rect>
          <rect
            x="-24"
            y={rect3Y}
            width="72"
            height="72"
            rx={rect3Radius}
            ry={rect3Radius}
            stroke="#fff"
            strokeWidth={0.04}
            fill="#f42e1ccc"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 12 ${36 + rect3Y}`}
              to={`360 12 ${36 + rect3Y}`}
              dur="11s"
              repeatCount="indefinite"
            />
          </rect>
        </g>
        <g>
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="none"
            stroke="#f00"
            strokeWidth="1"
          />
        </g>
        {props.noBeating == true ? null : (
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1; 1; 1.05; 1.025; 1.05; 1; 1"
            keyTimes="0; 0.25; 0.30; 0.35; 0.40; 0.55; 1"
            dur="2s"
            repeatCount="indefinite"
            additive="sum"
          />
        )}
      </g>
    </svg>
  );
}
