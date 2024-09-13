"use client";

import { useSidebarCollapsed } from "@/context/SidebarContext";
import { addPayments } from "@/services/paymentService";
import Input from "@/ui/input/Input";
import Money from "@/ui/Money";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { Button } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface PaymentFormProps {}

interface IFormPayment {
  name: string;
  amount: string;
  suffix: string;
}

const PaymentForm: React.FC<PaymentFormProps> = () => {
  const queryClient = useQueryClient();
  const { setCollapsed } = useSidebarCollapsed();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<IFormPayment>();
  const watchAmount = watch("amount");
  const watchSuffix = watch("suffix");

  const { mutateAsync: addNewPayment, isPending } = useMutation({
    mutationKey: ["add-payment"],
    mutationFn: addPayments,
  });

  useEffect(() => {
    setValue("suffix", "000");
  }, []);

  const onSubmit = useCallback(
    async (data: IFormPayment) => {
      try {
        await addNewPayment(
          { name: data.name, amount: data.amount + data.suffix },
          {
            onSuccess: () => {
              reset();
              setValue("suffix", "000");
              queryClient.invalidateQueries({
                queryKey: ["get-payment"],
              });
              toast.success("پرداخت با موفقیت ثبت شد");
              document.getElementById("amount")?.focus();
            },
          }
        );
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
      <div className="flex flex-row gap-x-1" dir="ltr">
        <Input
          name="amount"
          register={register}
          placeholder="مبلغ"
          errors={errors}
          validationSchema={{ required: "لطفا مبلغ را وارد کنید" }}
          style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          autoFocus
        />
        <Input
          name="suffix"
          register={register}
          errors={errors}
          validationSchema={{ required: "لطفا عدد وارد کنید" }}
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          maxLength={3}
          minLength={3}
        />
      </div>
      <div className="text-center">
        <Money amount={parseInt(watchAmount + watchSuffix)} className="font-extrabold text-lg" />
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
