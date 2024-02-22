"use client";

import { getTotalPayment } from "@/services/paymentService";
import { Subject as ISubject } from "@/types/subject";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Subject from "./Subject";
import confetti from "canvas-confetti";
import SubjectHeader from "./SubjectHeader";
import SubjectSummary from "./SubjectSummary";
import { getSubject } from "@/services/subjectService";

interface SubjectContainerProps {}

const SubjectContainer: React.FC<SubjectContainerProps> = () => {
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [completedSubjects, setCompletedSubjects] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [surplus, setSurplus] = useState(0);
  const [targetAmount, setTargetAmount] = useState(0);
  const { data: totalPayment = 0 } = useQuery({
    queryKey: ["get-totalPayment"],
    queryFn: getTotalPayment,
    enabled: subjects && subjects.length > 0,
    refetchInterval: 1000,
  });

  useEffect(() => {
    getSubject().then((res) => {
      setSubjects(res.items);
      setTargetAmount(
        res.items.reduce((prev, acc) => (prev += acc.targetAmount), 0)
      );
    });
  }, []);

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
            particleCount: 15,
            angle: 60,
            spread: 80,
            origin: { x: 0 },
          });
          confetti({
            particleCount: 15,
            angle: 120,
            spread: 80,
            origin: { x: 1 },
          });
          index++;
          if (index > 20) {
            clearInterval(interval);
          }
        }, 100);

        return _completedSubjects;
      }
      return _completedSubjects;
    });

    return items;
  }

  return (
    <>
      <div className="sticky top-0 inset-y-0 z-50 flex flex-col gap-2 bg-gray-100 dark:bg-neutral-900">
        <SubjectHeader />
        <SubjectSummary
          surplus={surplus}
          progress={progress}
          totalPayment={totalPayment}
          targetAmount={targetAmount}
        />
      </div>

      <div className="w-full grid grid-cols-12 gap-4">
        {subjects?.map((item) => (
          <Subject key={item.id} {...item} />
        ))}
      </div>
    </>
  );
};

export default SubjectContainer;
