'use client'
import NewPayment from "./NewPayment";
import SubjectContainer from "./SubjectContainer";

export default async function Home() {
  return (<>
    <section className="flex flex-col gap-4 w-full h-full items-stretch pt-3 overflow-auto">
      <SubjectContainer />
    </section>
    <NewPayment></NewPayment>
  </>
  );
}
