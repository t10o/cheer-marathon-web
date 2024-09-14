import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { ButtonHTMLAttributes, forwardRef } from "react";

import { Spacer } from "@/components/Spacer";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: IconDefinition;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, label, icon, ...props }: Props, ref) => {
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
          "bg-amber-500",
          "text-cyan-50",
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
