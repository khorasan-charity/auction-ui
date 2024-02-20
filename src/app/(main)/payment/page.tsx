import Box from "@/ui/Box";
import PaymentForm from "./PaymentForm";

export default async function Page() {
  return (
    <section className="w-full h-full flex items-center justify-center">
      <Box className="max-w-lg">
        <Box.Header>
          <Box.Title>پرداخت</Box.Title>
        </Box.Header>

        <Box.Body>
          <PaymentForm />
        </Box.Body>
      </Box>
    </section>
  );
}
