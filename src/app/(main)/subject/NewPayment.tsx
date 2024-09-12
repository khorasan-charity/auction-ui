import {
  getPayments,
} from "@/services/paymentService";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaymentItem } from "@/types/payment";
import Money from "@/ui/Money";
import clsx from "clsx";
import { getSettings } from "@/services/settingService";

type Props = {};

const NewPayment: React.FC<Props> = () => {
  const [lastPayment, setLastPayment] = useState<
    PaymentItem | null | undefined
  >(null);
  const [lastTotalPaymentCount, setLastTotalPaymentCount] = useState(0);
  const [normalPaymentMaximum, setNormalPaymentMaximum] = useState(2000000);
  const [normalPaymentDuration, setNormalPaymentDuration] = useState(2);
  const [silverPaymentMaximum, setSilverPaymentMaximum] = useState(10000000);
  const [silverPaymentDuration, setSilverPaymentDuration] = useState(4);
  const [goldPaymentDuration, setGoldPaymentDuration] = useState(8);

  const { data: list } = useQuery({
    queryKey: ["get-payment"],
    queryFn: getPayments,
    refetchInterval: 1000,
  });
  const { data: settings } = useQuery({
    queryKey: ["get-settings"],
    queryFn: getSettings,
    refetchInterval: 1000,
  });

  useEffect(() => {
    const lastItem = list?.items[0];

    setLastTotalPaymentCount((prev) => {
      if ((list?.totalCount || 0) > prev) {
        setLastPayment(lastItem);
        setTimeout(
          () => {
            setLastPayment(null);
          },
          lastItem!.amount >= silverPaymentMaximum
            ? goldPaymentDuration * 1000
            : lastItem!.amount >= normalPaymentMaximum
            ? silverPaymentDuration * 1000
            : normalPaymentDuration * 1000
        );
      }

      return list?.totalCount || 0;
    });
  }, [list]);

  useEffect(() => {
    if (settings?.normalPaymentMaximum) {
      setNormalPaymentMaximum(parseInt(settings?.normalPaymentMaximum ?? "0"));
    }
    if (settings?.normalPaymentDuration) {
      setNormalPaymentDuration(
        parseInt(settings?.normalPaymentDuration ?? "0")
      );
    }
    if (settings?.silverPaymentMaximum) {
      setSilverPaymentMaximum(parseInt(settings?.silverPaymentMaximum ?? "0"));
    }
    if (settings?.silverPaymentDuration) {
      setSilverPaymentDuration(
        parseInt(settings?.silverPaymentDuration ?? "0")
      );
    }
    if (settings?.goldPaymentDuration) {
      setGoldPaymentDuration(parseInt(settings?.goldPaymentDuration ?? "0"));
    }
  }, [settings]);

  return (
    lastPayment && (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-[100] select-none">
        <motion.div
          className={clsx(
            "bg-gradient-to-br shadow-lg p-32 rounded-3xl border-8 w-[90vw] flex flex-row items-center justify-center",
            lastPayment.amount >= silverPaymentMaximum
              ? "from-yellow-300 via-yellow-600 to-yellow-500 border-yellow-300"
              : lastPayment.amount >= normalPaymentMaximum
              ? "from-gray-500 via-gray-600 to-gray-400 border-gray-200"
              : "from-green-500 via-green-600 to-green-400 border-green-300"
          )}
          animate={{
            x: [-1800, 0, 0, 0, 1800],
            scale: [0.2, 1, 1.2, 1, 0.2],
          }}
          transition={{
            duration:
              lastPayment.amount >= silverPaymentMaximum
                ? goldPaymentDuration
                : lastPayment.amount >= normalPaymentMaximum
                ? silverPaymentDuration
                : normalPaymentDuration,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          <Money
            amount={lastPayment.amount}
            currencyClassName="text-[4vw]"
            className="font-extrabold text-[10vw] text-left text-white"
          />
        </motion.div>
      </div>
    )
  );
};

export default NewPayment;
