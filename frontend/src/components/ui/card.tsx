// components/Card.jsx
import React, { type HTMLAttributes } from "react";
import clsx from "clsx";
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}
export const Card: React.FC<CardProps> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={clsx(
      "rounded-lg border border-background bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader: React.FC<CardProps> = ({
  className,
  children,
  ...props
}) => (
  <div className={clsx("flex flex-col space-y-1.5 p-6", className)} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<CardProps> = ({
  className,
  children,
  ...props
}) => (
  <h3
    className={clsx(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  >
    {children}
  </h3>
);

export const CardDescription: React.FC<CardProps> = ({
  className,
  children,
  ...props
}) => (
  <p className={clsx("text-sm text-muted-foreground", className)} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<CardProps> = ({
  className,
  children,
  ...props
}) => (
  <div className={clsx("p-6 pt-0", className)} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<CardProps> = ({
  className,
  children,
  ...props
}) => (
  <div className={clsx("flex items-center p-6 pt-0", className)} {...props}>
    {children}
  </div>
);
