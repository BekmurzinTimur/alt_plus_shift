import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";
import { Spinner } from "../Icons/Spinner";
import cn from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children: ReactNode;
}

export const Button = ({
  variant = "primary",
  fullWidth = false,
  isLoading = false,
  leadingIcon,
  trailingIcon,
  children,
  className = "",
  disabled,
  size = "md",
  ...props
}: ButtonProps) => {
  const classes = cn([
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    className,
  ]);

  return (
    <button className={classes} disabled={disabled || isLoading} {...props}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {leadingIcon && <span className={styles.icon}>{leadingIcon}</span>}
          {children}
          {trailingIcon && <span className={styles.icon}>{trailingIcon}</span>}
        </>
      )}
    </button>
  );
};
