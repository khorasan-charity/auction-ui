import { getSubject } from "@/services/subjectService";
import SubjectContainer from "./SubjectContainer";
import SubjectHeader from "./SubjectHeader";

export default async function Home() {
  const subjectList = await getSubject();

  return (
    <section className="flex flex-col gap-4 w-full">
      <SubjectHeader />
      <div className="w-full grid grid-cols-12 gap-4">
        <SubjectContainer subjectList={subjectList} />
      </div>
    </section>
  );
}
