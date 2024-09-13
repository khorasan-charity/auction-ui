import { Subject as ISubject } from "@/types/subject";
import Money from "@/ui/Money";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CircularProgress,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

interface SubjectProps extends ISubject {}

const colors = {
  green: "from-green-400 to-green-600",
  sky: "from-sky-300 to-sky-700",
  neutral: "from-neutral-600 to-neutral-800",
};

const Subject: React.FC<SubjectProps> = (props) => {
  const [rect1Y, setRect1Y] = useState(24 * 0.5);
  const [rect2Y, setRect2Y] = useState(24 * 0.57);
  const [rect3Y, setRect3Y] = useState(24 * 0.6);
  const [rect1Radius, setRect1Radius] = useState(32.4);
  const [rect2Radius, setRect2Radius] = useState(30.96);
  const [rect3Radius, setRect3Radius] = useState(28.8);

  useEffect(() => {
    let percent = ((props.progress || 0) / 100);
    setRect1Y(30 - 37 * percent); // 0
    setRect2Y(30 - 37 * (percent - 0.07)); // 0.07
    setRect3Y(30 - 37 * (percent - 0.02)); // 0.1
  }, [props.progress]);

  return (
    <Card
      className={`w-full overflow-visible relative shadow-none col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-3 border-none bg-gradient-to-br ${
        !props.progress
          ? colors["neutral"]
          : props.progress < 100
          ? colors["sky"]
          : colors["green"]
      }`}
    >
      <svg
        className="absolute z-0 rounded-xl"
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transformOrigin: "center" }}
      >
        <g style={{ transformOrigin: "center" }}>
          <g>
            <rect
              x="-24"
              y={rect1Y}
              width="72"
              height="72"
              rx={rect1Radius}
              ry={rect1Radius}
              stroke="#fff"
              strokeWidth={0.04}
              fill="#a1f682cc"
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
              fill="#6aba4ccc"
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
              fill="#57a838cc"
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
        </g>
      </svg>
      <CardHeader className="w-full flex justify-center items-center">
        <strong className="text-lg font-bold text-white text-center">
          {props.title}
        </strong>
      </CardHeader>
      <CardBody
        className="flex justify-center items-center pb-0 relative overflow-hidden"
        style={{ height: "200px" }}
      >
        <CircularProgress
          classNames={{
            svg: "w-36 h-36 drop-shadow-md",
            indicator: "stroke-white",
            track: "stroke-white/10",
            value: "text-3xl font-semibold text-white",
          }}
          value={props.progress ?? 0}
          strokeWidth={4}
          showValueLabel={true}
        />
      </CardBody>
      <CardFooter className="flex justify-center items-center pt-5 text-white z-10">
        <div className="flex flex-col items-center justify-center">
          <Money amount={props.collectedAmount} />
          <span>از</span>
          <Money amount={props.targetAmount} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default Subject;
