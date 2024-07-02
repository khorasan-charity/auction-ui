"use client";

import Box from "@/ui/Box";
import { deletePayment, getPayments, getTotalPayment } from "@/services/paymentService";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Coin } from "@/icons/Coin";
import { usePathname } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi2";
import { toast } from "react-hot-toast";
import { useSidebarCollapsed } from "@/context/SidebarContext";
import Money from "@/ui/Money";
import { Progress } from "@nextui-org/react";
import { useEffect, useState } from "react";
import settingService from "@/services/settingService";

interface Sidebar2Props { }

const Sidebar2: React.FC<Sidebar2Props> = () => {
  const { collapsed, setCollapsed } = useSidebarCollapsed();
  const [targetCount, setTargetCount] = useState(1);
  const [amountPerItem, setAmountPerItem] = useState(1);
  const [progress, setProgress] = useState(0);

  const { data: totalPayment = 0 } = useQuery({
    queryKey: ["get-totalPayment"],
    queryFn: getTotalPayment,
    // enabled: subjects && subjects.length > 0,
    refetchInterval: 1000,
  });

  useEffect(() => {
    settingService.getSettings().then((res) => {
      setTargetCount(res.children.totalNeededSupportCount)
      setAmountPerItem(res.children.costPerYear);
    });
  }, []);

  useEffect(() => {
    setProgress(Math.round((totalPayment / (amountPerItem * targetCount)) * 10) / 10)
  }, [totalPayment]);

  return (
    <>
      {collapsed ? (
        <div
          className="bg-[rgb(15_23_42/0.3)] fixed inset-0 z-30 lg:hidden block opacity-80 transition-opacity md:opacity-100"
          onClick={setCollapsed}
        />
      ) : null}

      <aside
        className={`flex flex-col gap-2 h-full fixed lg:static w-2/3 md:w-[400px] transition-all duration-300 bottom-0 right-0 top-0 z-40  ${collapsed
          ? "visible translate-x-0 [display:inherit]"
          : "invisible translate-x-full lg:!translate-x-0 lg:!visible"
          }`}
      >
        <Box className="h-full w-full relative overflow-y-auto hideSB !pt-0 rounded-none bg-[#ffc000]">
          <Box.Header className="sticky  inset-x-0 top-0 pt-24 pb-4 w-full flex flex-col items-center justify-center">
            <img src="logo.png" alt="" height={240} width={240} />
            <strong className="text-lg lg:text-xl font-bold px-16 text-center">
              موسسه حمایت از کودکان مبتلا به سرطان خراسان
            </strong>
          </Box.Header>

          <Box.Body>
            <div className="w-full flex flex-col gap-3">
              <strong className="text-lg lg:text-xl font-bold px-4 text-center gap-2 flex flex-col">
                <div>هزینه داروی {targetCount} کودک در یک سال</div>
                <Money
                  amount={amountPerItem * targetCount}
                  className="text-2xl font-semibold"
                />
              </strong>
              <div className="relative flex justify-center items-center h-12">

                <Progress
                  className="absolute top-0"
                  classNames={{ track: 'bg-white h-12', labelWrapper: 'font-semibold', value: 'text-2xl' }}
                  radius="lg"
                  size="lg"
                  value={progress * 100}
                  color="success"
                  showValueLabel={false}
                />
                <div className="text-2xl font-semibold z-10">{progress * 100}%</div>
              </div>
              <strong className="text-lg lg:text-xl font-bold px-4 pt-8 text-center gap-2 flex flex-col">
                <div>مشارکت شما:</div>
                <Money
                  amount={totalPayment}
                  className="font-extrabold text-4xl text-indigo-600 dark:text-indigo-300"
                />
              </strong>
            </div>
          </Box.Body>
        </Box>
      </aside>
    </>
  );
};

const UserPayment = ({
  id,
  name,
  amount,
}: {
  id: number;
  name: string;
  amount: number;
}) => {
  const pathname = usePathname();
  const isDelete = pathname.toLowerCase().startsWith("/payment");

  return (
    <Box className="flex items-center gap-2 py-3 px-3 bg-slate-100">
      {isDelete ? (
        <DeletePaymentItem id={id} />
      ) : (
        <Coin className="w-12 h-12" />
      )}
      <div className="flex flex-col">
        <span className="font-medium text-md">{name || "ناشناس"}</span>
        <Money amount={amount} className="font-extrabold text-lg text-left" />
      </div>
    </Box>
  );
};

const DeletePaymentItem = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deletePaymentItem } = useMutation({
    mutationKey: ["delete-payment"],
    mutationFn: deletePayment,
  });

  const handleClick = async () => {
    try {
      await deletePaymentItem(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["get-payment"],
          });
          toast.success("حذف شد!");
        },
      });
    } catch (_) { }
  };

  return (
    <button
      onClick={handleClick}
      className="w-12 h-12 bg-red-200/50 rounded-full cursor-pointer text-red-500 flex items-center justify-center"
    >
      <HiOutlineTrash className="w-8 h-8" />
    </button>
  );
};

export default Sidebar2;
