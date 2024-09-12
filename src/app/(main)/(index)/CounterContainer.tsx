"use client";

import { getTotalPayment } from "@/services/paymentService";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import SubjectHeader from "./CounterHeader";
import { Drop } from "./drop";
import { Heart } from "./heart";
import CounterSummary from "./CounterSummary";
import CounterHeader from "./CounterHeader";
import {getSettings} from "@/services/settingService";


interface CounterContainerProps { }

const CounterContainer: React.FC<CounterContainerProps> = () => {
  const [progress, setProgress] = useState(0);
  const [surplus, setSurplus] = useState(0);
  const [targetCount, setTargetCount] = useState(1);
  const [amountPerItem, setAmountPerItem] = useState(1);
  const { data: totalPayment = 0 } = useQuery({
    queryKey: ["get-totalPayment"],
    queryFn: getTotalPayment,
    // enabled: subjects && subjects.length > 0,
    refetchInterval: 1000,
  });

  useEffect(() => {
    getSettings().then((res) => {
      setTargetCount(res.children.totalNeededSupportCount)
      setAmountPerItem(res.children.costPerYear);
    });
  }, []);

  useEffect(() => {
    setProgress(Math.round((totalPayment / (amountPerItem * targetCount)) * 10) / 10)
  }, [totalPayment]);

  return (
    <div className="flex flex-col h-screen py-3 items-center">
      <div className="sticky top-0 inset-y-0 z-50 flex flex-col gap-2 bg-gray-100 dark:bg-neutral-900 w-full">
        <CounterHeader />
        <CounterSummary
          count={totalPayment / amountPerItem}
          targetCount={targetCount}
          progress={progress}
          totalPayment={totalPayment}
          targetAmount={amountPerItem * targetCount}
        />
      </div>

      <img className="absolute left-0 bottom-0" src="kid.png" width={300} height={300} />

      <div className="relative aspect-square flex-1 w-fit">
        {Array.from({ length: 1 }, (_, i) => (
          <Drop
            key={i + (new Date()).getTime()}
            size={30}
            left={`${10 + Math.random() * 80}%`}
            top={-20 + Math.random() * 40}
          />
        ))}
        <Heart fillPercent={progress} />
      </div>

    </div>
  );
};

export default CounterContainer;
