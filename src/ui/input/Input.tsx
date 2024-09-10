"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<FieldValues> | any;
  errors?: FieldErrors | any;
  validationSchema?: object;
  name: React.InputHTMLAttributes<HTMLInputElement>["name"];
  endContent?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  type = "text",
  required,
  register,
  errors,
  className,
  validationSchema,
  endContent,
  ...props
}) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div>
      <div className="relative">
        <input
          id={name}
          autoComplete="off"
          spellCheck={false}
          type={type === "password" ? (show ? "text" : "password") : type}
          className={twMerge("textField__input", className)}
          {...(register && register(name!, validationSchema || {}) || {})}
          {...props}
        />
        {!!endContent && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-neutral-200">
            {endContent}
          </div>
        )}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 dark:text-neutral-200"
          >
            {show ? (
              <HiOutlineEye className="w-6 h-6" />
            ) : (
              <HiOutlineEyeSlash className="w-6 h-6" />
            )}
          </button>
        )}
      </div>
      {errors && errors[name!] && (
        <p className="text-red-500 text-right inline-block px-3 pt-2 text-sm w-full">
          {errors[name!]?.message}
        </p>
      )}
    </div>
  );
};

Input.displayName = "Input";

export default Input;
