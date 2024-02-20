"use client";

import { addPayments } from "@/services/paymentService";
import Input from "@/ui/input/Input";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { Button } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface PaymentFormProps {}

interface IFormPayment {
  name: string;
  amount: string;
}

const PaymentForm: React.FC<PaymentFormProps> = () => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<IFormPayment>();
  const watchAmount = watch('amount')

  const { mutateAsync: addNewPayment, isPending } = useMutation({
    mutationKey: ["add-payment"],
    mutationFn: addPayments,
  });

  const onSubmit = useCallback(
    async (data: IFormPayment) => {
      try {
        await addNewPayment(data, {
          onSuccess: () => {
            reset();
            queryClient.invalidateQueries({
              queryKey: ["get-payment"],
            });
            toast.success("پرداخت با موفقیت ثبت شد");
            document.getElementById("amount")?.focus()
          },
        });
      } catch (_) {
        toast.error("ثبت پرداخت با خطا مواجه شد");
      }
    },
    [addNewPayment, queryClient, reset]
  );

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <Input
        placeholder="عنوان"
        name="name"
        register={register}
        errors={errors}
      />
      <Input
        placeholder="مبلغ"
        name="amount"
        register={register}
        endContent="تومان"
        errors={errors}
        validationSchema={{ required: "لطفا مبلغ را وارد کنید" }}
        autoFocus
      />
      <div className="text-center">
        <strong className="font-extrabold text-lg text-left">
          {numberToCurrency(watchAmount, "تومان")}
        </strong>
      </div>
      <Button
        fullWidth
        radius="sm"
        isLoading={isPending}
        color="success"
        type="submit"
      >
        ثبت
      </Button>
    </form>
  );
};

export default PaymentForm;
