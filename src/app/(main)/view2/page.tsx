import CounterContainer from "./CounterContainer";

export default async function Home() {
  return (
    <section className="flex flex-col gap-4 w-full items-stretch">
      <CounterContainer />
    </section>
  );
}
