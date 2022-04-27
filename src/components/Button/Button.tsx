import { forwardRef } from "react";
import type { ComponentPropsWithRef } from "react";
import { buttonStyles } from "./Button.css";

export type ButtonProps = ComponentPropsWithRef<"button">;
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <button {...props} className={buttonStyles} ref={ref}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
