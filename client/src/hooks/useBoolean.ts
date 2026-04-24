import { useState } from "react";

export const useBoolean = (initialValue?: boolean) => {
  const [open, setOpen] = useState(initialValue || false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  const onToggle = () => setOpen((prev) => !prev);

  return {
    open,
    on: onOpen,
    off: onClose,
    toggle: onToggle,
  };
};
