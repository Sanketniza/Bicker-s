import * as React from "react";
import * as SwitchPrimitive from "./sheet";
import { cn } from "../../lib/utils"; // Relative path to utils

const Switch = React.forwardRef(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    className={cn(
      "w-10 h-6 bg-gray-200 rounded-full peer-[&]:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "block w-4 h-4 rounded-full bg-white transition-transform duration-300 peer-[&]:translate-x-4",
        className // Add className here as well
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = "Switch";

export { Switch };