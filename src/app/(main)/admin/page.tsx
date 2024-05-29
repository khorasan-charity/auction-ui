"use client";

import { getTotalPayment } from "@/services/paymentService";
import { Subject as ISubject } from "@/types/subject";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import subjectService from "@/services/subjectService";
import Subject from "./Subject";

interface SubjectContainerProps {}

const SubjectContainer: React.FC<SubjectContainerProps> = () => {
  const { data: subjectList } = useQuery({
    queryKey: ["get-subject"],
    queryFn: subjectService.getSubject,
  });

  return (
    <div className="w-full grid grid-cols-12 gap-4">
      {subjectList?.items.map((item) => (
        <Subject key={item.id} {...item} addMode={false} />
      ))}
      <Subject addMode />
    </div>
  );
};

export default SubjectContainer;
