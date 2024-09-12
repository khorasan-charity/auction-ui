import { Subject as ISubject } from "@/types/subject";
import Money from "@/ui/Money";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CircularProgress,
} from "@nextui-org/react";

interface SubjectProps extends ISubject {}

const colors = {
  green: "from-green-400 to-green-600",
  sky: "from-sky-500 to-sky-800",
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
      <CardBody className="flex justify-center items-center pb-0">
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
      <CardFooter className="flex justify-center items-center pt-5 text-white">
        {renderLabelProgress()}
      </CardFooter>
    </Card>
  );
};

export default Subject;
