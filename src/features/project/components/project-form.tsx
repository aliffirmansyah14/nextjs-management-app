import { FormField } from "@/components/shared/FormField";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
	ProjectFormType,
	projectSchema,
} from "@/features/project/schemas/project-schema";
import { useProjectModal } from "@/features/project/store/use-project-modal";
import { delay } from "@/lib/utils";
import { ActionResponse } from "@/types/action";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { createProjectAction } from "../actions/create-project";
import { toastError, toastSuccess } from "@/lib/toast";
import { updateWorkspaceAction } from "@/features/workspace/actions/update-workspace";
import { useEffect } from "react";
import { updateProjectAction } from "../actions/update-project";

type ProjectFormProps = {
	onLoadingChange: (loading: boolean) => void;
	workspaceId: string;
};

export default function ProjectForm({
	workspaceId,
	onLoadingChange,
}: ProjectFormProps) {
	const { type, data, closeModal } = useProjectModal();

	const formId = `project-form-${type}`;

	const projectForm = useForm<ProjectFormType>({
		resolver: zodResolver(projectSchema),
		defaultValues: {
			name: data?.name ?? "",
			description: data?.description ?? "",
		},
	});

	useEffect(() => {
		if (data && type === "edit") {
			projectForm.reset({
				name: data.name,
				description: data?.description ?? "",
			});
		} else if (type === "create") {
			projectForm.reset({ name: "" });
		}
	}, [data, type, projectForm.reset]);

	const isSubmitting = projectForm.formState.isSubmitting;

	const onSubmit: SubmitHandler<ProjectFormType> = async formData => {
		if (!type) return;

		onLoadingChange(true);
		await delay(1500); //mock delay

		try {
			let response: ActionResponse;

			if (type === "create") {
				response = await createProjectAction(workspaceId, formData);
			} else if (type === "edit" && data?.id) {
				response = await updateProjectAction(
					{ projectId: data.id, workspaceId },
					formData,
				);
			} else {
				return;
			}
			if (!response.success) {
				toastError(response.message);

				// tambahin error zod diserver jika ada error zod
				if (response.errors) {
					Object.entries(response.errors).forEach(([field, message]) => {
						projectForm.setError(field as keyof ProjectFormType, {
							message: Array.isArray(message) ? message[0] : message,
						});
					});
				}
				return;
			}

			projectForm.reset();
			toastSuccess(response.message);
			closeModal();
		} finally {
			onLoadingChange(false);
		}
	};

	return (
		<>
			<form id={formId} onSubmit={projectForm.handleSubmit(onSubmit)}>
				<FieldGroup className="gap-2">
					<FormField
						control={projectForm.control}
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
								maxLength={50}
							/>
						)}
					/>
					<FormField
						control={projectForm.control}
						name="description"
						label="Deskripsi"
						isOptional
						renderInput={(field, invalid) => (
							<Textarea
								{...field}
								id={field.name}
								aria-invalid={invalid}
								placeholder="Website teamm frontend Taskly"
								autoComplete="Website teamm frontend Taskly"
								rows={5}
								maxLength={150}
								className="resize-none h-20"
							/>
						)}
					/>
				</FieldGroup>
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
