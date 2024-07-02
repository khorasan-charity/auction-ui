"use client";

import { getPayments, getTotalPayment } from "@/services/paymentService";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import SubjectHeader from "./CounterHeader";
import { Drop } from "./drop";
import { Heart } from "./heart";
import CounterSummary from "./CounterSummary";
import CounterHeader from "./CounterHeader";
import settingService from "@/services/settingService";
import Money from "@/ui/Money";


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
  const { data: payments } = useQuery({
    queryKey: ["get-payment"],
    queryFn: getPayments,
    refetchInterval: 1000,
  });

  useEffect(() => {
    settingService.getSettings().then((res) => {
      setTargetCount(res.children.totalNeededSupportCount)
      setAmountPerItem(res.children.costPerYear);
    });
  }, []);

  useEffect(() => {
    setProgress(Math.round((totalPayment / (amountPerItem * targetCount)) * 10) / 10)
  }, [totalPayment]);

  return (
    <div className="flex flex-col h-screen py-3 items-center justify-center">

      <img className="absolute right-[400px] top-0 rounded-bl-3xl" src="kid-2.jpg" width={300} height={300} />

      <div>
        <CounterSummary
          count={totalPayment / amountPerItem}
          targetCount={targetCount}
          progress={progress}
          totalPayment={totalPayment}
          targetAmount={amountPerItem * targetCount}
        />

        <div className="p-8 flex justify-center items-center text-2xl font-semibold">
          <span>
            <span>تعداد مشارکت تا این لحظه:</span>
            &nbsp;
            <span>{payments?.totalCount}</span>
          </span>
        </div>

      </div>
    </div>
  );
};

export default CounterContainer;
