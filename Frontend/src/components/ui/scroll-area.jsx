import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "../../lib/utils"; // Relative path to utils

const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root className="relative overflow-hidden" {...props} ref={ref}>
    <ScrollAreaPrimitive.Viewport
      className={cn("h-full w-full rounded-[inherit] border border-input", className)}
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollAreaPrimitive.Scrollbar
      orientation="vertical"
      className="touch-none absolute right-1 top-0 h-full w-2 p-[1px] opacity-0 transition-opacity duration-300 hover:opacity-100"
    >
      <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-lg bg-border" />
    </ScrollAreaPrimitive.Scrollbar>
    <ScrollAreaPrimitive.Scrollbar
      orientation="horizontal"
      className="touch-none absolute bottom-1 left-0 w-full h-2 p-[1px] opacity-0 transition-opacity duration-300 hover:opacity-100"
    >
      <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-lg bg-border" />
    </ScrollAreaPrimitive.Scrollbar>
    <ScrollAreaPrimitive.Corner className="bg-background absolute bottom-1 right-1 h-2 w-2" />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = "ScrollArea";

export { ScrollArea };