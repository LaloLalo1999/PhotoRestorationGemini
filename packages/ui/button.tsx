import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", ...props }, ref) => {
    const variantClasses = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-600 text-white hover:bg-gray-700",
      outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    };

    return (
      <button
        ref={ref}
        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${variantClasses[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
