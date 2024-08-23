"use client";

import { useEffect, useState } from "react";
import { Heart } from "./heart";
import Box from "@/ui/Box";
import Money from "@/ui/Money";
import { useTheme } from "next-themes";

interface CounterContainer1Props { }

const CounterContainer1: React.FC<CounterContainer1Props> = () => {
  const [progress, setProgress] = useState(50);
  const [totalPayment, setTotalPayment] = useState(1600000000);
  const [targetAmount, setTargetAmount] = useState(0);
  const [targetCount, setTargetCount] = useState(1);
  const [totalSupportedChildren, setTotalSupportedChildren] = useState(159);
  const [contributionCount, setContributionCount] = useState(1);
  const [startAnimation, setStartAnimation] = useState(false);
  const [lastTotalPayment, setLastTotalPayment] = useState(0);
  const { theme, setTheme } = useTheme();


  return (
    <div
      className="flex flex-col h-screen items-center justify-start p-8 relative bg-[#fed504] dark:bg-neutral-900"
      style={{ height: "100%" }}
    >
      <Box className="flex flex-row items-center justify-center p-4 border-none">
        <img src="logo.png" alt="" height={120} width={120} />
        <span className="text-4xl font-bold text-center px-4">
          موسسه حمایت از کودکان مبتلا به سرطان خراسان
        </span>
      </Box>

      <div className="flex flex-col gap-10 p-4 mt-10 justify-center items-center font-semibold text-white [text-shadow:1px_1px_8px_var(--tw-shadow-color)] shadow-gray-400">
        <div className="text-5xl">تعداد مشارکت تا این لحظه</div>
        <div className="text-6xl bg-green-500 p-5 rounded-xl">{contributionCount} نفر</div>
      </div>

      <div
        className="flex-1 flex-grow p-10"
        style={{ maxHeight: "500", minHeight: "500" }}
      >
        <Heart
          fillPercent={progress}
          startAnimation={startAnimation}
          onAnimationEnd={() => {
            setStartAnimation(false);
          }}
        />
      </div>

      <div className="flex flex-col gap-10 p-4 mt-12 mb-10 justify-center items-center font-semibold text-white [text-shadow:1px_1px_8px_var(--tw-shadow-color)] shadow-gray-400">
        <div className="text-5xl">مبلغ جمع آوری شده</div>
        <div className="bg-green-500 p-5 rounded-xl">
          <Money
            amount={totalPayment}
            className="font-extrabold text-7xl text-white"
            currencyClassName="text-5xl"
          />
        </div>
        <div className="text-5xl">معادل حمایت از {totalSupportedChildren} کودک</div>
      </div>

      <div
        className="flex flex-row justify-between w-full"
        style={{ maxHeight: "12%", minHeight: "9%" }}
      >
        <img
          src="mahak-child1.png"
          style={{ maxWidth: "250px" }}
        />
        <img
          className="mx-auto pt-2"
          src="zendegi.png"
          style={{ objectFit: "contain", height: "100%", filter: theme != 'dark' ? 'brightness(0) invert(1)' : undefined }}
        />
      </div>
    </div>
  );
};

export default CounterContainer1;
