import { getPayments } from "@/services/paymentService";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"
import { PaymentItem } from "@/types/payment";
import Money from "@/ui/Money";
import clsx from 'clsx'

type Props = {

}

const silverMin = 3000000
const goldMin = 10000000

const NewPayment: React.FC<Props> = () => {

    const [lastPayment, setLastPayment] = useState<PaymentItem | null | undefined>(null)
    const { data: list } = useQuery({
        queryKey: ["get-payment"],
        queryFn: getPayments,
        refetchInterval: 1000,
    });

    useEffect(() => {
        const lastItem = [...(list?.items ?? [])].sort((a, b) => a.id > b.id ? 1 : -1).findLast(x => true)
        setLastPayment(prev => {
            if (lastItem?.id != prev?.id) {
                setTimeout(() => {
                    setLastPayment(null)
                }, lastItem!.amount >= goldMin ? 8000 : lastItem!.amount >= silverMin ? 4000 : 2000);
                return lastItem
            }
            return prev
        })

    }, [list])

    return lastPayment && <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-[100] select-none">
        <motion.div className={clsx("bg-gradient-to-br  shadow-lg p-32 rounded-3xl border-8", lastPayment.amount >= goldMin ? 'from-yellow-300 via-yellow-600 to-yellow-500 border-yellow-300' : lastPayment.amount >= silverMin ? 'from-gray-500 via-gray-600 to-gray-400 border-white' : 'from-green-500 via-green-600 to-green-400 border-green-300')}
            animate={{
                x: [-1800, 0, 0, 0, 1800],
            }}
            transition={{
                duration: lastPayment.amount >= goldMin ? 8 : lastPayment.amount >= silverMin ? 4 : 2,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1
            }}
        >
            <Money amount={lastPayment.amount} currencyClassName="text-3xl" className="font-extrabold text-9xl text-left " />
        </motion.div>
    </div>
}

export default NewPayment;
