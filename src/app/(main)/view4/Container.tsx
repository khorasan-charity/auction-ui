"use client";

import { useCallback, useEffect, useState } from "react";
import { Heart } from "./heart";
import Box from "@/ui/Box";
import Money from "@/ui/Money";
import { useTheme } from "next-themes";
import Input from "@/ui/input/Input";
import { Button } from "@nextui-org/react";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { SketchPicker } from "react-color";

interface CounterContainer1Props {}

const CounterContainer1: React.FC<CounterContainer1Props> = () => {
  const [progress, setProgress] = useState(0);
  const [totalPayment, setTotalPayment] = useState(5000000);
  const [targetAmount, setTargetAmount] = useState(90000000);
  const [targetCount, setTargetCount] = useState(1);
  const [totalSupportedChildren, setTotalSupportedChildren] = useState(5);
  const [contributionCount, setContributionCount] = useState(1);
  const [startAnimation, setStartAnimation] = useState(false);
  const [lastTotalPayment, setLastTotalPayment] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [title, setTitle] = useState(
    "سهم مهربانی شما در تامین هزینه جراحی حسنای عزیز"
  );
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#fed504");
  const { theme, setTheme } = useTheme();

  const handleUserKeyPress = useCallback((e: globalThis.KeyboardEvent) => {
    if (e.key.toLowerCase() === "r" || e.key == "ق") {
      startRecording();
    }
    if (e.key.toLowerCase() === "p" || e.key == "ح") {
      setStartAnimation(true);
    }
  }, []);

  const startRecording = useCallback(async () => {
    let stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });

    // let totalSeconds = Number(prompt("مدت کلیپ چند ثانیه باشد؟", "20")) || 20;
    let isRecording = false;

    //needed for better browser support
    const mime = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : "video/webm";
    let mediaRecorder = new MediaRecorder(stream, {
      mimeType: mime,
    });

    // setTimeout(() => {
    //   mediaRecorder.stop();
    // }, totalSeconds * 1000);

    let chunks: any[] = [];
    mediaRecorder.addEventListener("start", (e) => {
      console.log("recording started...");
      isRecording = true;
      setStartAnimation(true);
    });
    mediaRecorder.addEventListener("dataavailable", function (e) {
      chunks.push(e.data);
    });

    mediaRecorder.addEventListener("stop", function () {
      isRecording = false;
      let blob = new Blob(chunks, {
        type: chunks[0].type,
      });

      let a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "video.webm";
      a.click();
    });

    //we have to start the recorder manually
    mediaRecorder.start();
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  useEffect(() => {
    setProgress(totalPayment / targetAmount || 0);
  }, [totalPayment, targetAmount]);

  return (
    <div
      className="flex flex-col h-screen items-center justify-start p-[2vw] relative dark:bg-neutral-900"
      style={{ height: "100%", backgroundColor }}
    >
      <Box className="flex flex-row items-center justify-center p-2 border-none">
        <img
          src="logo.png"
          alt=""
          style={{ width: "10vw", height: "10vw" }}
          onClick={() => setShowSettings(!showSettings)}
        />
        <span
          className="font-bold text-center px-4 text-[3.5vw]"
          onClick={startRecording}
        >
          موسسه حمایت از کودکان مبتلا به سرطان خراسان
        </span>
      </Box>
      {showSettings && (
        <div className="flex flex-col gap-4 p-4 bg-white min-w-[80vw]">
          <Input
            dir="ltr"
            placeholder="عنوان"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-[3.2vw]"
          />
          <Input
            dir="ltr"
            placeholder="تعداد مشارکت"
            name="contributionCount"
            value={contributionCount}
            onChange={(e) => setContributionCount(Number(e.target.value))}
            className="text-[3.2vw]"
          />
          <Input
            dir="ltr"
            placeholder="مبلغ جمع‌آوری شده"
            name="totalPayments"
            value={totalPayment}
            onChange={(e) => setTotalPayment(Number(e.target.value))}
            className="text-[3.2vw]"
          />
          <Input
            dir="ltr"
            placeholder="مبلغ کل"
            name="targetAmount"
            value={targetAmount}
            onChange={(e) => setTargetAmount(Number(e.target.value))}
            className="text-[3.2vw]"
          />
          <div className="text-center">
            <strong className="font-extrabold text-[3.2vw] text-left">
              {numberToCurrency(totalPayment, "تومان")}
            </strong>
          </div>
          <div
            className="min-h-[4vw]"
            style={{ backgroundColor }}
            onClick={() => setShowColorPicker(true)}
          >
            {showColorPicker && (
              <div className="p-2 bg-white flex flex-col items-center justify-center gap-y-2">
                <SketchPicker
                  color={backgroundColor}
                  disableAlpha={true}
                  onChangeComplete={(e: any) => setBackgroundColor(e.hex)}
                />
                <Button
                  radius="sm"
                  color="success"
                  type="submit"
                  className="text-[3vw] py-[3vw]"
                  onClick={() => setShowColorPicker(false)}
                >
                  ثبت رنگ
                </Button>
              </div>
            )}
          </div>

          <Button
            fullWidth
            radius="sm"
            color="warning"
            className="text-[3vw] py-[3vw]"
            onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
          >
            تغییر تم
          </Button>
          <Button
            fullWidth
            radius="sm"
            color="warning"
            className="text-[3vw] py-[3vw]"
            onClick={() => document.documentElement.requestFullscreen()}
          >
            تمام صفحه
          </Button>
          <Button
            fullWidth
            radius="sm"
            color="danger"
            type="submit"
            className="text-[3vw] py-[3vw]"
            onClick={() => setShowSettings(false)}
          >
            بستن
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-[2vh] p-4 mt-[1vh] justify-center items-center font-bold text-white [text-shadow:0px_0px_15px_var(--tw-shadow-color)] shadow-gray-500">
        <div className="text-[5vw] text-center" style={{ lineHeight: "8vw" }}>
          {title}
        </div>
      </div>

      <div
        className="flex-1 flex-grow p-[2vh]"
        style={{ maxHeight: "500", minHeight: "500" }}
        onClick={() => setStartAnimation(true)}
      >
        <Heart
          fillPercent={progress}
          startAnimation={startAnimation}
          onAnimationEnd={() => {
            setStartAnimation(false);
          }}
        />
      </div>

      <div className="flex flex-col w-full p-[5vw] justify-center items-center font-bold text-white [text-shadow:0px_0px_15px_var(--tw-shadow-color)] shadow-gray-500">
        <div className="flex flex-row items-center justify-center">
          <div className="flex flex-col gap-y-[2vh] h-full items-end">
            <div className="flex-1 text-[4.5vw] pl-4 flex items-center">
              مشارکت
            </div>
            <div className="flex-1 text-[4.5vw] pl-4 flex items-center">
              تامین‌شده
            </div>
            <div className="flex-1 text-[4.5vw] pl-4 flex items-center">از</div>
          </div>
          <div className="flex flex-col gap-y-[2vh]">
            <div className="text-[5vw] bg-green-500 p-[4vw] rounded-xl">
              {contributionCount} نفر
            </div>
            <div className="bg-green-500 p-[4vw] rounded-xl flex flex-row items-center">
              <Money
                amount={totalPayment}
                className="font-extrabold text-[7vw] text-white"
                currencyClassName="text-[5vw]"
              />
            </div>
            <div className="bg-indigo-600 p-[4vw] rounded-xl flex flex-row items-center">
              <Money
                amount={targetAmount}
                className="font-extrabold text-[7vw] text-white"
                currencyClassName="text-[5vw]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full mb-4 px-[2vw]">
        <div className="flex flex-col items-center py-[3vh] gap-y-[7vw] text-white bg-teal-600 py-0 mx-0 rounded-xl text-center text-[6vw] w-full font-bold">
          <div>6037-7070-0022-1907</div>
          <div>بانک کشاورزی</div>
        </div>
      </div>
    </div>
  );
};

export default CounterContainer1;
