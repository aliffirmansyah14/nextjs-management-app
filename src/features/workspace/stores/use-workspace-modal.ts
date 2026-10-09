import { create } from "zustand";

type WorkspaceModalType = "create" | "edit" | "delete";

type WorkspaceData = {
	id: string;
	name: string;
	description?: string | null;
};

type WorkspaceModalState = {
	type: WorkspaceModalType | null;
	data: WorkspaceData | null;
	isOpen: boolean;
	openModal: (type: WorkspaceModalType, data?: WorkspaceData) => void;
	closeModal: () => void;
};

export const useWorkspaceModal = create<WorkspaceModalState>(set => ({
	type: null,
	data: null,
	isOpen: false,
	openModal: (type, data) =>
		set({ type, data: data ? data : null, isOpen: true }),
	closeModal: () => set({ isOpen: false, data: null, type: null }),
}));
