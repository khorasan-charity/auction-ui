import Box from "@/ui/Box";
import Money from "@/ui/Money";
import { Chip, Progress } from "@nextui-org/react";

interface CounterSummaryProps {
  totalPayment: number;
  targetAmount: number;
  count: number;
  targetCount: number;
  progress: number;
}

const CounterSummary: React.FC<CounterSummaryProps> = ({
  totalPayment,
  targetAmount,
  progress,
  count,
  targetCount
}) => {
  return (
    <Box className="overflow-hidden text-center py-3 px-2">
      <div className="w-full flex flex-wrap gap-0 gap-y-2 items-top justify-around inset-0 py-2">
        <Chip className="bg-transparent border-0" size="lg">
          <span className="text-neutral-600 dark:text-white text-xl">
            تعداد حمایت:
            &nbsp;
          </span>
          <span
            className="font-extrabold text-4xl text-indigo-600 dark:text-indigo-300"
          >
            {Math.round((count || 0) * 10) / 10}
            &nbsp;
            <span className="text-neutral-600 font-normal dark:text-white text-xl">
              از
            </span>
            &nbsp;
            {Math.round((targetCount || 0) * 10) / 10}
            &nbsp;
            <span className="font-normal text-sm">
              کودک
            </span>
          </span>
        </Chip>
        <Chip className="bg-transparent border-0" size="lg">
          <span className="text-neutral-600 dark:text-white text-xl">
            مبلغ جمع آوری شده:
            &nbsp;
          </span>
          <Money
            amount={totalPayment}
            className="font-extrabold text-4xl text-indigo-600 dark:text-indigo-300"
          />
        </Chip>
        {/* <Chip className="bg-transparent border-0 " size="lg">
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
        ) : null} */}
      </div>
      {/* <Progress
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
      </Chip> */}
    </Box>
  );
};

export default CounterSummary;
