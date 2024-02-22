import Box from "@/ui/Box";
import Money from "@/ui/Money";
import { Chip, Progress } from "@nextui-org/react";

interface SubjectSummaryProps {
  totalPayment: number;
  targetAmount: number;
  surplus: number;
  progress: number;
}

const SubjectSummary: React.FC<SubjectSummaryProps> = ({
  totalPayment,
  targetAmount,
  progress,
  surplus,
}) => {
  return (
    <Box className="overflow-hidden text-center pt-3 pb-1 px-2">
      <div className="w-full flex flex-wrap gap-0 gap-y-2 items-top justify-around inset-0 py-2">
        <Chip className="bg-transparent border-0" size="lg">
          <span className="text-neutral-600 dark:text-white text-xl">
            مبلغ جمع آوری شده:
            &nbsp;
          </span>
          <Money
            amount={totalPayment}
            className="font-extrabold text-2xl text-indigo-600 dark:text-indigo-300"
          />
        </Chip>
        <Chip className="bg-transparent border-0 " size="lg">
          <span className="text-neutral-600 dark:text-white text-xl">
            هدف:
            &nbsp;
          </span>
          <Money
            amount={targetAmount}
            className="font-extrabold text-2xl text-blue-600 dark:text-blue-300"
          />
        </Chip>
        {surplus > 0 ? (
          <Chip className="border-0 bg-amber-300 dark:bg-amber-500" size="lg">
            <span className="text-neutral-600 dark:text-white">
              مازاد هدف:
              &nbsp;
            </span>
            <Money amount={surplus} className="font-extrabold text-xl dark:text-white" />
          </Chip>
        ) : null}
      </div>
      <Progress
        classNames={{
          base: "w-full p-2",
          track: "drop-shadow-md border border-default",
          indicator: "bg-gradient-to-r from-green-300 to-green-600",
          label: "tracking-wider font-medium text-default-600",
          value: "text-foreground/60",
        }}
        className="inset-0 rounded-none rotate-180 z-0"
        size="lg"
        color="success"
        aria-label="Loading..."
        value={progress}
      />
      <Chip className="bg-transparent border-0" size="lg">
        <strong className="font-semibold text-2xl ">{`${progress}%`}</strong>
      </Chip>
    </Box>
  );
};

export default SubjectSummary;
