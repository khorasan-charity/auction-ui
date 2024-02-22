export const numberToCurrency = (
  money: number | string | any,
  suffix?: string
): string => {
  if (!suffix) suffix = "";
  if (isNaN(money)) {
    return `0 ${suffix.trim()}`.trimEnd();
  }
  const value = new Intl.NumberFormat().format(money as number);
  return `${value}  ${suffix.trim()}`.trimEnd();
};
