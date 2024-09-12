"use client";

import { getTotalPayment } from "@/services/paymentService";
import { Subject as ISubject } from "@/types/subject";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import subjectService from "@/services/subjectService";
import Subject from "./Subject";
import Sidebar from "./Sidebar";

interface SubjectContainerProps {}

const SubjectContainer: React.FC<SubjectContainerProps> = () => {
  const { data: subjectList } = useQuery({
    queryKey: ["get-subject"],
    queryFn: subjectService.getSubject,
  });

  return (
    <div className="flex flex-row mt-5 gap-x-2 px-2 sm:px-0 w-full">
      <Sidebar />
      <div className="flex-1 grid grid-cols-12 gap-4 h-[calc(100vh-3rem)] overflow-y-auto px-1">
        {subjectList?.items.map((item) => (
          <Subject key={item.id} {...item} addMode={false} />
        ))}
        <Subject addMode order={(subjectList?.items.length ?? 0) + 1} />
      </div>
    </div>
  );
};

export default SubjectContainer;
