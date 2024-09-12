import subjectService from "@/services/subjectService";
import { Subject as ISubject } from "@/types/subject";
import Money from "@/ui/Money";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "@/ui/input/Input";
import { numberToCurrency } from "@/utils/numberToCurrency";

interface SubjectProps {
  addMode: boolean;
  id?: number;
  title?: string;
  targetAmount?: number;
  order?: number;
}

interface IFormSubject {
  id: number;
  title: string;
  targetAmount: number;
  order: number;
}

const Subject: React.FC<SubjectProps> = (props) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<IFormSubject>();
  const watchAmount = watch("targetAmount");

  useEffect(() => {
    if (!props.addMode) {
      console.log(props);

      setValue("id", props.id!);
      setValue("title", props.title!);
      setValue("targetAmount", props.targetAmount!);
    }
    setValue("order", props.order ?? 1);
  }, [props]);

  const { mutateAsync: addSubject, isPending: isAddPending } = useMutation({
    mutationKey: ["add-subject"],
    mutationFn: subjectService.addSubject,
  });

  const { mutateAsync: updateSubject, isPending: isUpdatePending } =
    useMutation({
      mutationKey: ["update-subject"],
      mutationFn: subjectService.updateSubject,
    });

  async function handleDelete(id: number) {
    await subjectService.deleteSubject(id);
    await queryClient.invalidateQueries({
      queryKey: ["get-subject"],
    });
  }

  const onSubmit = useCallback(
    async (data: IFormSubject) => {
      try {
        if (props.addMode) {
          await addSubject(data, {
            onSuccess: () => {
              reset();
              queryClient.invalidateQueries({
                queryKey: ["get-subject"],
              });
              toast.success("با موفقیت ثبت شد");
            },
          });
        } else {
          await updateSubject(
            { ...data },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: ["get-subject"],
                });
                toast.success("با موفقیت ثبت شد");
              },
            }
          );
        }
      } catch (_) {
        toast.error("ثبت با خطا مواجه شد");
      }
    },
    [addSubject, queryClient, reset]
  );

  return (
    <Card
      className={`w-full overflow-visible shadow-none col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-3 border-none bg-gradient-to-br from-neutral-600 to-neutral-800`}
    >
      <CardBody className="flex justify-center items-center pb-0">
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <Input
            placeholder="عنوان"
            name="title"
            register={register}
            errors={errors}
            validationSchema={{ required: "لطفا عنوان را وارد کنید" }}
            autoFocus
          />
          <Input
            placeholder="مبلغ"
            name="targetAmount"
            register={register}
            endContent="تومان"
            errors={errors}
            validationSchema={{ required: "لطفا مبلغ را وارد کنید" }}
          />
          <div className="text-center">
            <Money
              amount={watchAmount}
              className="text-white font-extrabold text-lg"
            />
          </div>
          <Input
            placeholder="ترتیب نمایش"
            name="order"
            register={register}
            errors={errors}
            validationSchema={{ required: "لطفا ترتیب را وارد کنید" }}
          />
          <div className="flex flex-row gap-x-2">
            <Button
              fullWidth
              radius="sm"
              isLoading={isAddPending || isUpdatePending}
              color="success"
              type="submit"
            >
              {props.addMode ? "افزودن" : "بروزرسانی"}
            </Button>

            {!props.addMode && (
              <Button
                fullWidth
                radius="sm"
                color="danger"
                onClick={() => handleDelete(props.id!)}
              >
                حذف
              </Button>
            )}
          </div>
        </form>
      </CardBody>
      <CardFooter className="flex justify-center items-center pt-5 text-white"></CardFooter>
    </Card>
  );
};

export default Subject;
