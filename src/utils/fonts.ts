import LocalFont from "next/font/local";

const fonts = LocalFont({
  src: [
    {
      path: "../../public/fonts/YekanBakhFaNum-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/YekanBakhFaNum-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/YekanBakhFaNum-Regular.woff2",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../../public/fonts/YekanBakhFaNum-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/YekanBakhFaNum-Bold.woff2",
      weight: "bold",
      style: "normal",
    },
    {
      path: "../../public/fonts/YekanBakhFaNum-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/YekanBakhFaNum-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/YekanBakhFaNum-ExtraBlack.woff2",
      weight: "950",
      style: "normal",
    },
  ],
  variable: "--font-yekanbakh",
  style: "normal",
  display: "swap",
});

export default fonts;
