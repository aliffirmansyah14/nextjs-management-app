import { create } from "zustand";

type ProjectModalType = "create" | "edit" | "delete";

type ProjectData = {
	id: string;
	name: string;
	description?: string | null;
};

type ProjectModalState = {
	data: ProjectData | null;
	type: ProjectModalType | null;
	isOpen: boolean;
	openModal: (type: ProjectModalType, data?: ProjectData) => void;
	closeModal: () => void;
};

export const useProjectModal = create<ProjectModalState>(set => ({
	data: null,
	isOpen: false,
	type: null,
	closeModal: () => set({ isOpen: false, type: null, data: null }),
	openModal: (newType, data) =>
		set({
			type: newType,
			isOpen: true,
			data: data ? data : null,
		}),
}));
