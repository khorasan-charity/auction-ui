"use client";

import { getPayments, getTotalPayment } from "@/services/paymentService";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import settingService from "@/services/settingService";
import CounterSummary from "../(index)/CounterSummary";


interface CounterContainer1Props { }

const CounterContainer1: React.FC<CounterContainer1Props> = () => {
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
    <div className="flex flex-col h-screen py-3 items-center justify-start">

      <img className="absolute right-[400px] top-0 rounded-bl-3xl" src="kid-2.jpg" width={300} height={300} />

      <div className="pt-[333px]">
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
        
        <img className="mx-auto pt-16" src="zendegi.png" width={400} />

        {/* <div className="pt-24 flex justify-center items-center text-4xl font-semibold">
          <span>
            <span>اینجا صحبت از زندگی</span>
            &nbsp;
            <span className="text-rose-600">بخشیدن</span>
            &nbsp;
            <span>است</span>
          </span>
        </div> */}

      </div>
    </div>
  );
};

export default CounterContainer1;
