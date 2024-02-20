export const numberToCurrency = (
  money: number | string | any,
  suffix?: string
): string => {
  if (!suffix) suffix = "﷼";
  const value = new Intl.NumberFormat().format(money as number);
  return `${value}  ${suffix.trim()}`.trimEnd();
};
