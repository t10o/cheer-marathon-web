import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { ButtonHTMLAttributes, forwardRef } from "react";

import { Spacer } from "@/components/Spacer";

type ButtonColor = "primary" | "text";
type ButtonVariant = "contained" | "outlined" | "text";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: IconDefinition;
  variant?: ButtonVariant;
  color?: ButtonColor;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      className,
      label,
      icon,
      variant = "contained",
      color = "primary",
      ...props
    }: Props,
    ref,
  ) => {
    const backgroundColor = {
      primary: "bg-amber-500",
      text: "bg-white",
    };

    const textColor = {
      primary: "text-amber-500",
      text: "text-black",
    };

    const borderColor = {
      primary: "border-amber-500",
      text: "border-none",
    };

    const buttonStyle = () => {
      switch (variant) {
        case "contained":
          return [backgroundColor[color], "text-cyan-50"];

        case "outlined":
          return ["bg-white", textColor[color], "border-2", borderColor[color]];

        case "text":
          return [textColor[color]];
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
          color !== "text" && variant !== "text" && "font-bold",
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
