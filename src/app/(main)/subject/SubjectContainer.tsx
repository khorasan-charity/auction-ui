"use client";

import {
  getTotalPayment,
  getTotalContributionCount,
} from "@/services/paymentService";
import { Subject as ISubject } from "@/types/subject";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import Subject from "./Subject";
import confetti from "canvas-confetti";
import SubjectHeader from "./SubjectHeader";
import SubjectSummary from "./SubjectSummary";
import subjectService from "@/services/subjectService";
import Webcam from "react-webcam";
import { Button } from "@nextui-org/react";
import { getSettings } from "@/services/settingService";
import Subject2 from "./Subject2";
import Subject3 from "./Subject3";

interface SubjectContainerProps {}

const SubjectContainer: React.FC<SubjectContainerProps> = () => {
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [completedSubjects, setCompletedSubjects] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [surplus, setSurplus] = useState(0);
  const [targetAmount, setTargetAmount] = useState(0);
  const [showCamera, setShowCamera] = useState(false);
  const [autoCameraDuration, setAutoCameraDuration] = useState(0);
  const [confettiDuration, setConfettiDuration] = useState(5);
  const [deviceId, setDeviceId] = useState<any>(undefined);
  const [devices, setDevices] = useState([]);
  const [showCameraSettings, setShowCameraSettings] = useState(false);
  const [subjectTheme, setSubjectTheme] = useState("1");

  const { data: totalPayment = 0 } = useQuery({
    queryKey: ["get-totalPayment"],
    queryFn: getTotalPayment,
    enabled: subjects && subjects.length > 0,
    refetchInterval: 1000,
  });
  const { data: totalPaymentCount = 0 } = useQuery({
    queryKey: ["get-totalContributionCount"],
    queryFn: getTotalContributionCount,
    enabled: subjects && subjects.length > 0,
    refetchInterval: 1000,
  });
  const { data: settings } = useQuery({
    queryKey: ["get-settings"],
    queryFn: getSettings,
    refetchInterval: 1000,
  });
  const handleDevices = useCallback(
    (mediaDevices: any) =>
      setDevices(mediaDevices.filter(({ kind }: any) => kind === "videoinput")),
    [setDevices]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  useEffect(() => {
    subjectService.getSubject().then((res) => {
      setSubjects(res.items);
      setTargetAmount(
        res.items.reduce((prev, acc) => (prev += acc.targetAmount), 0)
      );
    });
  }, []);

  useEffect(() => {
    if (settings?.camera) {
      setShowCamera(settings?.camera == "on");
    }
    if (settings?.autoCameraDuration) {
      setAutoCameraDuration(parseInt(settings?.autoCameraDuration ?? "0"));
    }
    if (settings?.confettiDuration) {
      setConfettiDuration(parseInt(settings?.confettiDuration ?? "0"));
    }
    if (settings?.subjectTheme) {
      setSubjectTheme(settings?.subjectTheme ?? "1");
    }
  }, [settings]);

  useEffect(() => {
    setSubjects(processSubjects(subjects.map((x) => ({ ...x }))));
  }, [totalPayment]);

  function processSubjects(items: ISubject[]) {
    const _targetAmount = items.reduce(
      (prev, acc) => (prev += acc.targetAmount),
      0
    );
    setTargetAmount(_targetAmount);

    if (_targetAmount > 0) {
      setProgress(Math.floor((totalPayment / _targetAmount) * 100));
    } else {
      setProgress(0);
    }

    setSurplus(totalPayment > _targetAmount ? totalPayment - _targetAmount : 0);
    let remainedAmount = totalPayment;
    let _completedSubjects = 0;
    items.forEach((item) => {
      if (remainedAmount >= item.targetAmount) {
        remainedAmount = remainedAmount - item.targetAmount;
        item.progress = 100;
        item.collectedAmount = item.targetAmount;
        _completedSubjects++;
      } else if (remainedAmount > 0) {
        item.progress = Math.floor((remainedAmount / item.targetAmount) * 100);
        item.collectedAmount = remainedAmount;
        remainedAmount = 0;
      } else {
        item.progress = 0;
        item.collectedAmount = 0;
      }
    });
    setCompletedSubjects((prev) => {
      if (_completedSubjects > prev) {
        let index = 0;
        const interval = setInterval(() => {
          confetti({
            particleCount: 10,
            scalar: 4,
            angle: -35,
            spread: 100,
            origin: { x: 0, y: 0 },
          });
          confetti({
            particleCount: 10,
            scalar: 4,
            angle: 220,
            spread: 100,
            origin: { x: 1, y: 0 },
          });
          index++;
          if (index > confettiDuration * 10) {
            clearInterval(interval);
          }
        }, 100);
        if (autoCameraDuration > 0) {
          setShowCamera(true);
          setTimeout(() => {
            setShowCamera(false);
          }, autoCameraDuration * 1000);
        }

        return _completedSubjects;
      }
      return _completedSubjects;
    });

    return items;
  }

  return (
    <>
      <div className="sticky top-0 inset-y-0 z-2 flex flex-col gap-2 bg-gray-100 dark:bg-neutral-900">
        <SubjectHeader />
        <SubjectSummary
          surplus={surplus}
          progress={progress}
          totalPayment={totalPayment}
          totalPaymentCount={totalPaymentCount}
          targetAmount={targetAmount}
        />
      </div>

      {showCamera ? (
        <div className="flex flex-col justify-center items-center">
          <Webcam
            className="rounded-xl w-full"
            mirrored
            videoConstraints={{ facingMode: "environment", deviceId: deviceId }}
            onDoubleClick={() => setShowCameraSettings((x) => !x)}
          />
          {showCameraSettings ? (
            <div className="flex flex-col gap-y-2 mt-2">
              {devices.map((device: any, key) => (
                <Button
                  color="success"
                  onClick={() => setDeviceId(device.deviceId)}
                >
                  {device.label || `Device ${key + 1}`}
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="w-full grid grid-cols-12 gap-4 h-[calc(100vh-15.5rem)] overflow-y-auto px-1">
          {subjects?.map((item) => {
            switch (subjectTheme) {
              case "1":
                return <Subject key={item.id} {...item} />;
              case "2":
                return <Subject2 key={item.id} {...item} />;
              case "3":
                return <Subject3 key={item.id} {...item} />;
            }
          })}
        </div>
      )}
    </>
  );
};

export default SubjectContainer;
