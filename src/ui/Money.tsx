import { getSettings } from "@/services/settingService";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { useQuery } from "@tanstack/react-query";

interface MoneyProps {
  amount?: number;
  currency?: string;
  className?: string;
  currencyClassName?: string;
}

const Money: React.FC<MoneyProps> = (props) => {
  const { data: settings } = useQuery({
    queryKey: ["get-settings"],
    queryFn: getSettings,
    refetchInterval: 1000,
  });

  return (
    <strong className={props.className ?? "font-bold text-xl"}>
      {numberToCurrency(
        props.amount ?? 0,
        undefined,
        settings?.showMoneyShorter == "true"
      )}
      &nbsp;
      <span className={props.currencyClassName ?? "font-normal text-sm"}>
        {props.currency ?? "تومان"}
      </span>
    </strong>
  );
};

export default Money;
