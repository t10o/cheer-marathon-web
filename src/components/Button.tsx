import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { ButtonHTMLAttributes, forwardRef } from "react";

import { Spacer } from "@/components/Spacer";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: IconDefinition;
  variant?: "contained" | "outlined" | "text";
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, label, icon, variant = "contained", ...props }: Props, ref) => {
    const buttonStyle = () => {
      switch (variant) {
        case "contained":
          return ["bg-amber-500", "text-cyan-50"];

        case "outlined":
          return ["bg-white", "text-amber-500", "border-2", "border-amber-500"];

        case "text":
          return ["text-amber-500"];
      }
    };

    return (
      <button
        ref={ref}
        className={clsx(
          className,
          "cursor-pointer",
          "rounded",
          "px-4",
          "h-12",
          "font-bold",
          ...buttonStyle(),
          props.disabled && ["opacity-50", "cursor-not-allowed"],
        )}
        {...props}
      >
        {icon && (
          <>
            <FontAwesomeIcon icon={icon} />
            <Spacer size="xsmall" />
          </>
        )}
        {label}
      </button>
    );
  },
);

Button.displayName = "Button";
