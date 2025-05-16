import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import React, { Fragment, type ReactNode } from "react";

interface DialogProps {
  isopen: boolean;
  closeModal: () => boolean;
  children:ReactNode;
}
const dialogWrapper = ({ isopen, closeModal, children }: DialogProps) => {
  return (
    <Transition appear show={isopen} as={Fragment}>
      <Dialog as="div" className="relatve z-50" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </TransitionChild>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duratio-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duratio-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
                {children}
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default dialogWrapper;
