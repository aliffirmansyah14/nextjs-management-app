import { create } from "zustand";

interface MobileNavState {
	isOpen: boolean;
	openNav: () => void;
	closeNav: () => void;
	setIsOpen: (open: boolean) => void;
}

export const useMobileNav = create<MobileNavState>(set => ({
	isOpen: false,
	openNav: () => set({ isOpen: true }),
	closeNav: () => set({ isOpen: false }),
	setIsOpen: open => set({ isOpen: open }),
}));
