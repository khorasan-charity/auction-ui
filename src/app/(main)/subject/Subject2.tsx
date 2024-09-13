import { Subject as ISubject } from "@/types/subject";
import Money from "@/ui/Money";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CircularProgress,
} from "@nextui-org/react";
import { Heart } from "./Heart";

interface SubjectProps extends ISubject {}

const colors = {
  green: "from-green-400 to-green-600",
  sky: "from-sky-300 to-sky-700",
  neutral: "from-neutral-600 to-neutral-800",
};

const Subject: React.FC<SubjectProps> = (props) => {
  const renderLabelProgress = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <Money amount={props.collectedAmount} />
        <span>از</span>
        <Money amount={props.targetAmount} />
      </div>
    );
  };

  return (
    <Card
      className={`w-full overflow-visible shadow-none col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-3 border-none bg-gradient-to-br ${
        !props.progress
          ? colors["neutral"]
          : props.progress < 100
          ? colors["sky"]
          : colors["green"]
      }`}
    >
      <CardHeader className="w-full flex justify-center items-center">
        <strong className="text-lg font-bold text-white text-center">
          {props.title}
        </strong>
      </CardHeader>
      <CardBody
        className="flex justify-center items-center pb-0 relative overflow-hidden"
        style={{ height: "200px" }}
      >
        <div className="absolute top-0 left-0">
          <Heart
            fillPercent={(props.progress || 0) / 100}
            noBeating={(props.progress || 0) >= 100}
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex flex-row justify-center items-center">
          <span
            className="text-3xl font-semibold text-white"
            style={{ marginInline: "auto", width: "fit-content" }}
          >
            %{props.progress}
          </span>
        </div>
        {/* <CircularProgress
          classNames={{
            svg: "w-36 h-36 drop-shadow-md",
            indicator: "stroke-white",
            track: "stroke-white/10",
            value: "text-3xl font-semibold text-white",
          }}
          value={props.progress ?? 0}
          strokeWidth={4}
          showValueLabel={true}
        /> */}
      </CardBody>
      <CardFooter className="flex justify-center items-center pt-5 text-white">
        {renderLabelProgress()}
      </CardFooter>
    </Card>
  );
};

export default Subject;
