import clsx from "clsx";
import { forwardRef, InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }: Props, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          className,
          "bg-white",
          "border",
          "border-gray-300",
          "text-black",
          "rounded",
          "block",
          "p-2",
          "outline-0",
          "focus:border-amber-500",
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
