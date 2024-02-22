// "use server";

// import { cookies } from "next/headers";

// export const getCookie = async <T>(name: string) => {
//   const cookie = cookies();

//   return cookie.get(name)?.value as T;
// };

// export const setCookie = async (name: string, value: string) => {
//   const cookie = cookies();

//   cookie.set({
//     name,
//     value,
//     httpOnly: true,
//     path: "/",
//   });
// };

// export const removeCookie = async (name: string) => {
//   const cookie = cookies();
//   cookie.delete(name);
// };
