import { numberToCurrency } from "@/utils/numberToCurrency";

interface MoneyProps {
  amount?: number;
  currency?: string;
  className?: string;
}

const Money: React.FC<MoneyProps> = (props) => {
  return (
    <strong className={props.className ?? "font-bold text-xl"}>
      {numberToCurrency(props.amount ?? 0)}
      &nbsp;
      <span className="font-normal text-sm">{props.currency ?? "تومان"}</span>
    </strong>
  );
};

export default Money;
