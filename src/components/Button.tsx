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
    const getColor = () => {
      switch (color) {
        case "primary":
          return "amber-500";

        case "text":
          return "black";
      }
    };

    const buttonStyle = () => {
      switch (variant) {
        case "contained":
          return [`bg-${getColor()}`, "text-cyan-50"];

        case "outlined":
          return [
            "bg-white",
            `text-${getColor()}`,
            "border-2",
            `border-${getColor()}`,
          ];

        case "text":
          return [`text-${getColor()}`];
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
