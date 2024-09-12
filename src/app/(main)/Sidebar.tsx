"use client";

import Box from "@/ui/Box";
import {
  deletePayment,
  getPayments,
  getTotalContributionCount,
} from "@/services/paymentService";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Coin } from "@/icons/Coin";
import { usePathname } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi2";
import { toast } from "react-hot-toast";
import { useSidebarCollapsed } from "@/context/SidebarContext";
import Money from "@/ui/Money";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const { collapsed, setCollapsed } = useSidebarCollapsed();
  const { data: list } = useQuery({
    queryKey: ["get-payment"],
    queryFn: getPayments,
    refetchInterval: 1000,
  });
  const { data: totalPaymentCount = 0 } = useQuery({
    queryKey: ["get-totalContributionCount"],
    queryFn: getTotalContributionCount,
    refetchInterval: 1000,
  });

  return (
    <>
      {collapsed ? (
        <div
          className="bg-[rgb(15_23_42/0.3)] fixed inset-0 z-30 lg:hidden block opacity-80 transition-opacity md:opacity-100"
          onClick={setCollapsed}
        />
      ) : null}

      <aside
        className={`flex flex-col gap-2 h-full max-h-screen fixed lg:static w-2/3 md:w-[300px] transition-all duration-300 bottom-0 right-0 top-0 z-40 py-3 ${
          collapsed
            ? "visible translate-x-0 [display:inherit]"
            : "invisible translate-x-full lg:!translate-x-0 lg:!visible"
        }`}
      >
        <Box className="h-full w-full relative overflow-y-auto hideSB !pt-0 rounded-none md:rounded-xl px-2">
          <Box.Header className="sticky bg-white dark:bg-neutral-800 inset-x-0 top-0 pt-6 pb-4 w-full flex items-center justify-center">
            <strong className="font-bold text-xl">آخرین پرداخت ها</strong>
          </Box.Header>

          <Box.Body>
            <div className="overflow-y-auto w-full flex flex-col gap-3 h-[calc(100vh-9rem)] px-1">
              {list?.items?.map((item, index) => (
                <AnimatePresence key={item.id}>
                  <motion.div
                    className="relative"
                    initial={{ opacity: 1, x: -200 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 1, x: 0 }}
                  >
                    <UserPayment
                      id={item.id}
                      index={totalPaymentCount - index}
                      name={item.name}
                      amount={item.amount}
                    />
                  </motion.div>
                </AnimatePresence>
              ))}
            </div>
          </Box.Body>
        </Box>
      </aside>
    </>
  );
};

const UserPayment = ({
  id,
  index,
  name,
  amount,
}: {
  id: number;
  index: number;
  name: string;
  amount: number;
}) => {
  const pathname = usePathname();
  const isDelete = pathname.toLowerCase().startsWith("/payment");

  return (
    <Box className="flex items-center gap-2 p-0 bg-slate-100 border-slate-300 dark:border-slate-500">
      {isDelete ? (
        <div className="p-2">
          <DeletePaymentItem id={id} />
        </div>
      ) : (
        <div
          style={{ height: "70px", width: "65px" }}
          className="flex items-center justify-center font-semibold text-large bg-warning text-white rounded-r-lg"
        >
          {index}
        </div>
      )}
      <div className="flex flex-col gap-y-2">
        <span className="font-medium text-md">{name || "ناشناس"}</span>
        <Money amount={amount} className="font-extrabold text-xl text-left" />
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
