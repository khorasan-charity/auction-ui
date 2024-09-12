export const numberToCurrency = (
  money: number | string | any,
  suffix?: string,
  shorter?: boolean
): string => {
  if (!suffix) suffix = "";
  if (isNaN(money)) {
    return `0 ${suffix.trim()}`.trimEnd();
  }
  let value = new Intl.NumberFormat().format(money as number);
  if (shorter) {
    if (value.length < 16 && value.endsWith(",000,000,000")) {
      value = value.substring(0, value.length - 12) + " میلیارد";
    } else if (value.length < 12 && value.endsWith(",000,000")) {
      value = value.substring(0, value.length - 8) + " میلیون";
    } else if (value.length < 8 && value.endsWith(",000")) {
      value = value.substring(0, value.length - 4) + " هزار";
    }
  }
  return `${value}  ${suffix.trim()}`.trimEnd();
};
