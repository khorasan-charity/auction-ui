import { useEffect, useRef, useState } from "react";

export type HeartProps = {
  fillPercent: number;
  startAnimation: boolean;
  onAnimationEnd?(): void;
};

export function Heart(props: HeartProps) {
  const [rect1Y, setRect1Y] = useState(24 * 0.5);
  const [rect2Y, setRect2Y] = useState(24 * 0.57);
  const [rect3Y, setRect3Y] = useState(24 * 0.6);
  const [rect1Radius, setRect1Radius] = useState(32.4);
  const [rect2Radius, setRect2Radius] = useState(30.96);
  const [rect3Radius, setRect3Radius] = useState(28.8);
  const animateRef = useRef<SVGElement>(null);

  useEffect(() => {
    setRect1Y(24 - 24 * props.fillPercent);
    setRect2Y(24 - 24 * (props.fillPercent - 0.02)); // 0.07
    setRect3Y(24 - 24 * (props.fillPercent - 0.04)); // 0.1
  }, [props.fillPercent]);

  useEffect(() => {
    function onAnimationEnded() {
      props?.onAnimationEnd?.();
    }
    if (props.startAnimation) {
      (animateRef.current as SVGAnimateElement).addEventListener(
        "endEvent",
        onAnimationEnded
      );
      return function cleanup() {
        (animateRef.current as SVGAnimateElement).removeEventListener(
          "endEvent",
          onAnimationEnded,
          false
        );
      };
    }
  });

  useEffect(() => {
    if (props.startAnimation) {
      if (animateRef.current) {
        (animateRef.current as SVGAnimateElement).beginElement();
      }
    }
  }, [props.startAnimation]);

  return (
    <div className="heartContainer">
      <div className="heart">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
          <svg x="0" y="0" width="150" height="600" viewBox="0 0 150 600">
            <path
              d="M 10,20 h 70 v 10 h 20 v -10"
              stroke="silver"
              stroke-width="5"
              fill="none"
              stroke-linejoin="round"
            />
            <path
              d="M 10,10 v 600"
              stroke="silver"
              stroke-width="15"
              fill="none"
              stroke-linejoin="round"
            />
            <path
              d="M 90,30 v 15"
              stroke="silver"
              stroke-width="2"
              fill="none"
              stroke-linejoin="round"
            />
            <path
              d="M 35,45 h 110 v 210 h -45 v 15 h -20 v -15 h -45 v -212"
              stroke="#a0d9ef"
              stroke-width="4"
              fill="none"
              stroke-linejoin="round"
            />
            <image href="/qolak.png" x="40" y="50" height="200" />
          </svg>
          <svg x="0" y="0" width="800" height="600" viewBox="0 0 800 600">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              id="staticPipeline"
              d="M 90,270 V 500 H 250 V 50 H 575 v 50"
              stroke="#a0d9ef"
              stroke-width="7"
              fill="none"
              stroke-linejoin="round"
            />
            <path
              id="animatedFlow"
              d="M 90,270 V 500 H 250 V 50 H 575 v 50"
              stroke="red"
              stroke-width="7"
              fill="none"
              filter="url(#glow)"
              stroke-dasharray={"70,1430"}
              strokeDashoffset="70"
              stroke-linejoin="round"
            >
              <animate
                id="bloodFlow"
                attributeName="stroke-dashoffset"
                from="1500"
                to="70"
                dur="1.7s"
                begin="coinOpacity.end - 0.5s"
                repeatCount="1"
                fill="freeze"
              />
            </path>
          </svg>
          <svg
            className="heart-svg"
            x="350"
            y="120"
            width="450"
            height="450"
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
              <animateTransform
                attributeName="transform"
                type="scale"
                values="1; 1; 1.05; 1.025; 1.05; 1; 1"
                keyTimes="0; 0.25; 0.30; 0.35; 0.40; 0.55; 1"
                dur="2s"
                repeatCount="indefinite"
                additive="sum"
              />
            </g>
          </svg>
          <svg
            x="550"
            y="50"
            width="50"
            height="150"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="red"
              opacity="0"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; 0 100"
                keyTimes="0; 1"
                begin="bloodFlow.end -0.30s"
                dur="2s"
                repeatCount="1"
                fill="freeze"
              />
              <animate
                attributeName="opacity"
                values="0; 1; 0"
                keyTimes="0; 0.2; 1"
                begin="bloodFlow.end -0.30s"
                dur="2s"
                repeatCount="1"
                fill="freeze"
              />
            </path>
          </svg>

          <svg x="0" y="0" width="800" height="600" viewBox="0 0 256 256">
            <g
              style={{
                stroke: "none",
                strokeWidth: 0,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeMiterlimit: 10,
                fill: "none",
                fillRule: "nonzero",
                opacity: 0,
                transformOrigin: "center",
              }}
              transform="translate(64 64) scale(1 1)"
            >
              <circle
                cx="45.001"
                cy="47.211"
                r="42.791"
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  fill: "rgb(232,129,2)",
                  fillRule: "nonzero",
                  opacity: 1,
                }}
                transform="  matrix(1 0 0 1 0 0) "
              />
              <circle
                cx={45}
                cy="42.79"
                r={35}
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  fill: "rgb(243,158,9)",
                  fillRule: "nonzero",
                  opacity: 1,
                }}
                transform="  matrix(1 0 0 1 0 0) "
              />
              <path
                d="M 45 13.791 c 17.977 0 32.78 13.555 34.766 31 c 0.15 -1.313 0.234 -2.647 0.234 -4 c 0 -19.33 -15.67 -35 -35 -35 s -35 15.67 -35 35 c 0 1.353 0.085 2.687 0.234 4 C 12.22 27.346 27.023 13.791 45 13.791 z"
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  fill: "rgb(232,129,2)",
                  fillRule: "nonzero",
                  opacity: 1,
                }}
                transform=" matrix(1 0 0 1 0 0) "
                strokeLinecap="round"
              />
              <path
                d="M 45 0 C 21.367 0 2.209 19.158 2.209 42.791 c 0 23.633 19.158 42.791 42.791 42.791 s 42.791 -19.158 42.791 -42.791 C 87.791 19.158 68.633 0 45 0 z M 45 75.928 c -18.301 0 -33.137 -14.836 -33.137 -33.137 C 11.863 24.49 26.699 9.653 45 9.653 S 78.137 24.49 78.137 42.791 C 78.137 61.092 63.301 75.928 45 75.928 z"
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  fill: "rgb(254,236,154)",
                  fillRule: "nonzero",
                  opacity: 1,
                }}
                transform=" matrix(1 0 0 1 0 0) "
                strokeLinecap="round"
              />
              <path
                d="M 45 0 C 21.367 0 2.209 19.158 2.209 42.791 c 0 23.633 19.158 42.791 42.791 42.791 s 42.791 -19.158 42.791 -42.791 C 87.791 19.158 68.633 0 45 0 z M 45 75.928 c -18.301 0 -33.137 -14.836 -33.137 -33.137 C 11.863 24.49 26.699 9.653 45 9.653 S 78.137 24.49 78.137 42.791 C 78.137 61.092 63.301 75.928 45 75.928 z"
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  fill: "rgb(253,216,53)",
                  fillRule: "nonzero",
                  opacity: 1,
                }}
                transform=" matrix(1 0 0 1 0 0) "
                strokeLinecap="round"
              />
              <path
                d="M 83.422 23.947 l -7.339 7.339 c 1.241 3.352 1.947 6.961 2.035 10.723 l 8.623 -8.623 C 85.999 30.079 84.88 26.916 83.422 23.947 z"
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  fill: "rgb(254,236,154)",
                  fillRule: "nonzero",
                  opacity: 1,
                }}
                transform=" matrix(1 0 0 1 0 0) "
                strokeLinecap="round"
              />
              <path
                d="M 44.218 75.909 c -3.762 -0.087 -7.371 -0.794 -10.723 -2.035 l -7.339 7.339 c 2.969 1.459 6.132 2.578 9.439 3.32 L 44.218 75.909 z"
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  fill: "rgb(254,236,154)",
                  fillRule: "nonzero",
                  opacity: 1,
                }}
                transform=" matrix(1 0 0 1 0 0) "
                strokeLinecap="round"
              />
              <path
                d="M 15.236 57.365 l -7.118 7.118 c 3.188 5.408 7.526 10.054 12.685 13.598 l 6.975 -6.975 C 22.396 67.826 18.027 63.053 15.236 57.365 z"
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  fill: "rgb(254,236,154)",
                  fillRule: "nonzero",
                  opacity: 1,
                }}
                transform=" matrix(1 0 0 1 0 0) "
                strokeLinecap="round"
              />
              <path
                d="M 66.692 5.909 l -7.118 7.118 c 5.688 2.791 10.461 7.16 13.741 12.541 l 6.975 -6.975 C 76.745 13.435 72.1 9.097 66.692 5.909 z"
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  fill: "rgb(254,236,154)",
                  fillRule: "nonzero",
                  opacity: 1,
                }}
                transform=" matrix(1 0 0 1 0 0) "
                strokeLinecap="round"
              />
              <path
                d="M 49.861 10.012 c 1.441 0.212 2.849 0.522 4.223 0.913 l 7.565 -7.565 c -1.224 -0.517 -2.478 -0.976 -3.756 -1.379 L 49.861 10.012 z"
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  fill: "rgb(254,236,154)",
                  fillRule: "nonzero",
                  opacity: 1,
                }}
                transform=" matrix(1 0 0 1 0 0) "
                strokeLinecap="round"
              />
              <path
                d="M 5.569 59.44 l 7.565 -7.565 c -0.391 -1.374 -0.701 -2.782 -0.913 -4.223 L 4.19 55.683 C 4.593 56.962 5.052 58.216 5.569 59.44 z"
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  fill: "rgb(254,236,154)",
                  fillRule: "nonzero",
                  opacity: 1,
                }}
                transform=" matrix(1 0 0 1 0 0) "
                strokeLinecap="round"
              />
              <path
                d="M 44.737 67.688 c -4.711 0 -9.153 -2.883 -10.902 -7.546 c -0.582 -1.552 0.204 -3.281 1.756 -3.862 c 1.549 -0.586 3.28 0.203 3.862 1.755 c 1.089 2.906 4.34 4.389 7.248 3.294 c 2.905 -1.09 4.384 -4.341 3.294 -7.248 c -0.624 -1.664 -1.967 -2.908 -3.685 -3.412 l -0.188 -0.062 l -4.224 -1.547 c -3.497 -1.06 -6.231 -3.618 -7.512 -7.033 c -1.091 -2.909 -0.983 -6.068 0.302 -8.896 c 1.285 -2.828 3.595 -4.986 6.504 -6.077 c 6.002 -2.25 12.72 0.801 14.972 6.806 c 0.582 1.551 -0.204 3.281 -1.755 3.863 c -1.547 0.579 -3.281 -0.203 -3.862 -1.755 c -1.09 -2.907 -4.341 -4.385 -7.249 -3.295 c -1.408 0.528 -2.526 1.573 -3.148 2.941 c -0.622 1.369 -0.674 2.898 -0.146 4.307 c 0.624 1.665 1.967 2.908 3.685 3.413 l 0.187 0.062 l 4.225 1.547 c 3.496 1.06 6.23 3.618 7.512 7.033 c 2.251 6.005 -0.803 12.722 -6.806 14.973 C 47.467 67.449 46.091 67.688 44.737 67.688 z"
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  fill: "rgb(232,129,2)",
                  fillRule: "nonzero",
                  opacity: 1,
                }}
                transform=" matrix(1 0 0 1 0 0) "
                strokeLinecap="round"
              />
              <path
                d="M 45 32.323 c -1.657 0 -3 -1.343 -3 -3 V 24.5 c 0 -1.657 1.343 -3 3 -3 c 1.657 0 3 1.343 3 3 v 4.823 C 48 30.979 46.657 32.323 45 32.323 z"
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  fill: "rgb(232,129,2)",
                  fillRule: "nonzero",
                  opacity: 1,
                }}
                transform=" matrix(1 0 0 1 0 0) "
                strokeLinecap="round"
              />
              <path
                d="M 45 72.5 c -1.657 0 -3 -1.343 -3 -3 v -4.823 c 0 -1.657 1.343 -3 3 -3 c 1.657 0 3 1.343 3 3 V 69.5 C 48 71.157 46.657 72.5 45 72.5 z"
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  fill: "rgb(232,129,2)",
                  fillRule: "nonzero",
                  opacity: 1,
                }}
                transform=" matrix(1 0 0 1 0 0) "
                strokeLinecap="round"
              />
              <path
                d="M 44.737 63.688 c -4.711 0 -9.153 -2.883 -10.902 -7.546 c -0.582 -1.552 0.204 -3.281 1.756 -3.862 c 1.549 -0.586 3.28 0.203 3.862 1.755 c 1.089 2.906 4.34 4.389 7.248 3.294 c 2.905 -1.09 4.384 -4.341 3.294 -7.248 c -0.624 -1.664 -1.967 -2.908 -3.685 -3.412 l -0.188 -0.062 l -4.224 -1.547 c -3.497 -1.06 -6.231 -3.618 -7.512 -7.033 c -1.091 -2.909 -0.983 -6.068 0.302 -8.896 c 1.285 -2.828 3.595 -4.986 6.504 -6.077 c 6.002 -2.25 12.72 0.801 14.972 6.806 c 0.582 1.551 -0.204 3.281 -1.755 3.863 c -1.547 0.579 -3.281 -0.203 -3.862 -1.755 c -1.09 -2.907 -4.341 -4.385 -7.249 -3.295 c -1.408 0.528 -2.526 1.573 -3.148 2.941 c -0.622 1.369 -0.674 2.898 -0.146 4.307 c 0.624 1.665 1.967 2.908 3.685 3.413 l 0.187 0.062 l 4.225 1.547 c 3.496 1.06 6.23 3.618 7.512 7.033 c 2.251 6.005 -0.803 12.722 -6.806 14.973 C 47.467 63.449 46.091 63.688 44.737 63.688 z"
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  fill: "rgb(253,216,53)",
                  fillRule: "nonzero",
                  opacity: 1,
                }}
                transform=" matrix(1 0 0 1 0 0) "
                strokeLinecap="round"
              />
              <path
                d="M 45 28.323 c -1.657 0 -3 -1.343 -3 -3 V 20.5 c 0 -1.657 1.343 -3 3 -3 c 1.657 0 3 1.343 3 3 v 4.823 C 48 26.979 46.657 28.323 45 28.323 z"
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  fill: "rgb(253,216,53)",
                  fillRule: "nonzero",
                  opacity: 1,
                }}
                transform=" matrix(1 0 0 1 0 0) "
                strokeLinecap="round"
              />
              <path
                d="M 45 68.5 c -1.657 0 -3 -1.343 -3 -3 v -4.823 c 0 -1.657 1.343 -3 3 -3 c 1.657 0 3 1.343 3 3 V 65.5 C 48 67.157 46.657 68.5 45 68.5 z"
                style={{
                  stroke: "none",
                  strokeWidth: 1,
                  strokeDasharray: "none",
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  fill: "rgb(253,216,53)",
                  fillRule: "nonzero",
                  opacity: 1,
                }}
                transform=" matrix(1 0 0 1 0 0) "
                strokeLinecap="round"
              />
              <animate
                ref={animateRef}
                id="coinOpacity"
                attributeName="opacity"
                values="0; 1; 1; 0"
                keyTimes="0; 0.1; 0.8; 1"
                begin="indefinite"
                dur="1.5s"
                repeatCount="1"
                fill="freeze"
              />

              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; 40 50; -170 -100"
                keyTimes="0; 0.2; 1"
                dur="1.5s"
                begin="coinOpacity.begin"
                repeatCount="1"
                additive="sum"
                calcMode="spline"
                keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
              />

              <animateTransform
                attributeName="transform"
                type="scale"
                values="1 1; 1.5 1.5; 0.3 0.3"
                keyTimes="0; 0.2; 1"
                dur="1.5s"
                begin="coinOpacity.begin"
                repeatCount="1"
                additive="sum"
                calcMode="spline"
                keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
              />
            </g>
          </svg>
        </svg>
      </div>
    </div>
  );
}
