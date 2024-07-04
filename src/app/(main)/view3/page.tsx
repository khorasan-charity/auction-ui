import CounterContainer1 from "./CounterContainer1";

export default async function Home() {
  return (
    <section className="flex flex-col gap-4 w-full h-screen items-stretch">
      <CounterContainer1 />
    </section>
  );
}
