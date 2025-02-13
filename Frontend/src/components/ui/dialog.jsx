import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../../lib/utils"; // Relative path to utils

const Dialog = ({ children, ...props }) => (
  <DialogPrimitive.Root {...props}>
    {children}
  </DialogPrimitive.Root>
);

const DialogTrigger = ({ children, ...props }) => (
  <DialogPrimitive.Trigger {...props}>
    {children}
  </DialogPrimitive.Trigger>
);

const DialogContent = ({ className, children, ...props }) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
    <DialogPrimitive.Content
      className={cn(
        "fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-background p-6 shadow-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute top-4 right-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);

const DialogHeader = ({ children, ...props }) => (
  <div className="flex flex-col space-y-1.5 text-center sm:text-left" {...props}>
    {children}
  </div>
);

const DialogTitle = ({ className, children, ...props }) => (
  <DialogPrimitive.Title
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
  >
    {children}
  </DialogPrimitive.Title>
);

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle };