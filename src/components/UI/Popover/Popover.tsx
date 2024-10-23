/* eslint-disable import/order */
import { popoverProps } from "@/src/types/popover.type";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

export default function PopOver({ content, children }: popoverProps) {
  return (
    <Popover backdrop="blur" placement="bottom-start">
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="py-3 flex flex-col items-start">
        {content}
      </PopoverContent>
    </Popover>
  );
}
