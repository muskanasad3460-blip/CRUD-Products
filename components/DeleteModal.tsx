"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function DeleteModal({ isOpen, onClose, onConfirm }: any) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-start justify-center pt-20 p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
              <Dialog.Title className="text-lg font-semibold text-gray-800">
                Delete Product
              </Dialog.Title>

              <p className="text-gray-600 mt-2">
                Are you sure you want to delete this product?
              </p>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>

                <button
                  onClick={onConfirm}
                  className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
