"use client";

import { getPayments, getTotalPayment } from "@/services/paymentService";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import settingService from "@/services/settingService";
import CounterSummary from "../(index)/CounterSummary";
import { Heart } from "./heart";

interface CounterContainer1Props {}

const CounterContainer1: React.FC<CounterContainer1Props> = () => {
  const [progress, setProgress] = useState(0);
  const [surplus, setSurplus] = useState(0);
  const [targetCount, setTargetCount] = useState(1);
  const [amountPerItem, setAmountPerItem] = useState(1);
  const [startAnimation, setStartAnimation] = useState(false);
  const [lastTotalPayment, setLastTotalPayment] = useState(0);
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
      setTargetCount(res.children.totalNeededSupportCount);
      setAmountPerItem(res.children.costPerYear);
    });
  }, []);

  useEffect(() => {
    setLastTotalPayment((prev) => {
      if (prev < totalPayment) {
        setStartAnimation(true);
        return totalPayment;
      }
      return prev;
    });

    setProgress(
      Math.round((totalPayment / (amountPerItem * targetCount)) * 100) / 100
    );
  }, [totalPayment]);

  return (
    <div
      className="flex flex-col h-screen items-center justify-start px-2 relative bg-slate-100"
      style={{ height: "100%" }}
    >
      {/* <img className="absolute right-[400px] top-0 rounded-bl-3xl" src="kid-2.jpg" width={300} height={300} /> */}

      <div className="pt-2 px-4" style={{ maxHeight: "30%", minHeight: "15%" }}>
        <CounterSummary
          count={totalPayment / amountPerItem}
          targetCount={targetCount}
          progress={progress}
          totalPayment={totalPayment}
          targetAmount={amountPerItem * targetCount}
        />

        <div className="p-4 flex justify-center items-center text-2xl font-semibold text-yellow-400">
          <span>
            <span>تعداد مشارکت تا این لحظه:</span>
            &nbsp;
            <span>{payments?.totalCount}</span>
          </span>
        </div>
      </div>

      <div
        className="flex-1 flex-grow"
        style={{ maxHeight: "80%", minHeight: "50%" }}
      >
        <Heart
          fillPercent={progress}
          startAnimation={startAnimation}
          onAnimationEnd={() => {
            setStartAnimation(false);
          }}
        />
      </div>

      <div
        className="flex-shrink"
        style={{ maxHeight: "15%", minHeight: "10%" }}
      >
        <img
          className="mx-auto pt-2"
          src="zendegi.png"
          style={{ objectFit: "contain", height: "100%" }}
        />
      </div>

      <img
        className="absolute"
        src="mahak-child1.png"
        width="25%"
        style={{ right: 0, bottom: 0, maxWidth: "250px" }}
      />
    </div>
  );
};

export default CounterContainer1;
