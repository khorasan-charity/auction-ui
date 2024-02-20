"use client";

import { getTotalPayment } from "@/services/paymentService";
import { SchemaApi } from "@/types/shared";
import { Subject as ISubject } from "@/types/subject";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Subject from "./Subject";
import confetti from "canvas-confetti";

interface SubjectContainerProps {
  subjectList: SchemaApi<ISubject[]>;
}

const SubjectContainer: React.FC<SubjectContainerProps> = ({ subjectList }) => {
  const [subjects, setSubjects] = useState<ISubject[]>(subjectList.items);
  const [completedSubjects, setCompletedSubjects] = useState<number>(0);

  const { data: totalPayment = 0 } = useQuery({
    queryKey: ["get-totalPayment"],
    queryFn: getTotalPayment,
    refetchInterval: 1000,
  });

  useEffect(() => {
    setSubjects((prev) => {
      let newSubjects = [...prev] as ISubject[];
      let remainedAmount = totalPayment;
      let _completedSubjects = 0;
      newSubjects.forEach((item) => {
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
              angle: 60,
              spread: 55,
              origin: { x: 0 },
            });
            confetti({
              particleCount: 10,
              angle: 120,
              spread: 55,
              origin: { x: 1 },
            });
            index++;
            if (index > 20) {
              clearInterval(interval);
            }
          }, 100);

          return _completedSubjects;
        }
        return prev;
      });
      return newSubjects;
    });
  }, [totalPayment]);

  return subjects?.map((item) => <Subject key={item.id} {...item} />) as any;
};

export default SubjectContainer;
