import { Transition } from "@headlessui/react";
import React, { Fragment, type ReactNode } from "react";

interface transitionProps {
  children: ReactNode
}
const transitionWrapper = ({ children }: transitionProps) => {
  return <Transition as={Fragment}
  enter="transition ease-out duration-100"
  enterFrom="transform opacity-0 scale-95"
  enterTo="transition opacity-100 scale-100"
  leave="transition ease-in  duration-75"
  leaveFrom="transformation opacity-100 scale-100"
  leaveTo="trasform opacity-0 scale-95">{children}</Transition>;
};

export default transitionWrapper;
