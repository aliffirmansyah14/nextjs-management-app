"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import {
	WorkspaceFormType,
	workspaceSchema,
} from "@/features/workspace/schemas/workspace-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWorkspaceModal } from "../stores/use-workspace-modal";
import { FormField } from "@/components/shared/FormField";
import { Input } from "@/components/ui/input";
import { delay } from "@/lib/utils";
import { createWorkspaceAction } from "../actions/create-workspace";
import { toastError, toastSuccess } from "@/lib/toast";
import { stat } from "fs";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { useEffect } from "react";
import { ActionResponse } from "@/types/action";
import { updateWorkspaceAction } from "../actions/update-workspace";

type WorkspaceFormProps = {
	onLoadingChange: (loading: boolean) => void;
};

export default function WorkspaceForm({ onLoadingChange }: WorkspaceFormProps) {
	const type = useWorkspaceModal(state => state.type);
	const data = useWorkspaceModal(state => state.data);
	const closeModal = useWorkspaceModal(state => state.closeModal);

	const formId = `workspace-form-${type}`;

	const workspaceForm = useForm<WorkspaceFormType>({
		resolver: zodResolver(workspaceSchema),
		defaultValues: {
			name: data?.name ?? "",
		},
	});

	// reset isi form tiap kali modal ditutup/buka
	useEffect(() => {
		if (data && type === "edit") {
			workspaceForm.reset({ name: data.name });
		} else if (type === "create") {
			workspaceForm.reset({ name: "" });
		}
	}, [data, type, workspaceForm]);

	const isSubmitting = workspaceForm.formState.isSubmitting;

	const onSubmit: SubmitHandler<WorkspaceFormType> = async formData => {
		if (!type) return;

		onLoadingChange(true);
		await delay(1500); //mock delay

		try {
			let response: ActionResponse;

			if (type === "create") {
				response = await createWorkspaceAction(formData);
			} else if (type === "edit" && data?.id) {
				response = await updateWorkspaceAction(data.id, formData);
			} else {
				return;
			}
			if (!response.success) {
				toastError(response.message);

				// tambahin error zod diserver jika ada error zod
				if (response.errors) {
					Object.keys(response.errors).forEach(([field, message]) => {
						workspaceForm.setError(field as keyof WorkspaceFormType, {
							message: Array.isArray(message) ? message[0] : message,
						});
					});
				}
				return;
			}

			workspaceForm.reset();
			toastSuccess(response.message);
			closeModal();
		} finally {
			onLoadingChange(false);
		}
	};

	return (
		<>
			<form id={formId} onSubmit={workspaceForm.handleSubmit(onSubmit)}>
				<FormField
					control={workspaceForm.control}
					name="name"
					label="Nama"
					renderInput={(field, invalid) => (
						<Input
							{...field}
							id={field.name}
							aria-invalid={invalid}
							placeholder="Team app"
							autoComplete="Team app"
							className="h-10"
						/>
					)}
				/>
			</form>
			<DialogFooter className="gap-2 sm:gap-0 pt-2">
				<DialogClose
					render={
						<Button type="button" variant="outline" disabled={isSubmitting}>
							Batal
						</Button>
					}
				/>
				<Button form={formId} type="submit" disabled={isSubmitting}>
					{isSubmitting ? (
						<span className="flex items-center gap-2">
							<Spinner className="size-4" />
							<span>Menyimpan...</span>
						</span>
					) : type === "edit" ? (
						"Simpan Perubahan"
					) : (
						"Simpan"
					)}
				</Button>
			</DialogFooter>
		</>
	);
}
