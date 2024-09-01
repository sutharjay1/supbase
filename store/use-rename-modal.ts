import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const defaultValues = {
    id: "",
    title: "",
};

interface RenameModalState {
    isOpen: boolean;
    initialValues: typeof defaultValues;
    onOpen: (id: string, title: string) => void;
    onClose: () => void;
}

export const useRenameModal = create<RenameModalState>()(
    persist(
        (set) => ({
            isOpen: false,
            initialValues: defaultValues,
            onOpen: (id: string, title: string) =>
                set({ isOpen: true, initialValues: { id, title } }),
            onClose: () =>
                set({ isOpen: false, initialValues: defaultValues }),
        }),
        { name: "rename-modal", storage: createJSONStorage(() => localStorage), }
    )
);
