"use client";

import Box from "@/ui/Box";
import { deletePayment, getPayments } from "@/services/paymentService";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Coin } from "@/icons/Coin";
import { usePathname } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi2";
import { toast } from "react-hot-toast";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const { data: list } = useQuery({
    queryKey: ["get-payment"],
    queryFn: getPayments,
    refetchInterval: 1000,
  });

  return (
    <aside className="flex flex-col gap-2 w-[300px] h-full">
      <Box className="h-full w-full relative overflow-y-auto hideSB !pt-0">
        <Box.Header className="sticky bg-white dark:bg-neutral-800 inset-x-0 top-0 pt-6 pb-4 w-full flex items-center justify-center">
          <strong className="font-bold text-xl">آخرین پرداخت ها</strong>
        </Box.Header>

        <Box.Body>
          <div className="overflow-y-auto w-full flex flex-col gap-3">
            {list?.items?.map((item) => (
              <UserPayment
                key={item.id}
                id={item.id}
                name={item.name}
                amount={item.amount}
              />
            ))}
          </div>
        </Box.Body>
      </Box>
    </aside>
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
  const isDelete = pathname === "/payment";

  return (
    <Box className="flex items-center gap-2 py-3 px-3">
      {isDelete ? (
        <DeletePaymentItem id={id} />
      ) : (
        <Coin className="w-12 h-12" />
      )}
      <div className="flex flex-col">
        <span className="font-medium text-xl">{name || "ناشناس"}</span>
        <strong className="font-extrabold text-lg text-left">
          {numberToCurrency(amount, "تومان")}
        </strong>
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
    } catch (_) {}
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

export default Sidebar;
