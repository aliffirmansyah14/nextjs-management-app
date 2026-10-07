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
import { useState } from "react";
import { ActionResponse } from "@/types/action";

type WorkspaceFormProps = {
	onLoadingChange: (loading: boolean) => void;
};

export default function WorkspaceForm({ onLoadingChange }: WorkspaceFormProps) {
	const type = useWorkspaceModal(state => state.type);
	const data = useWorkspaceModal(state => state.data);

	const formId = `workspace-form-${type}`;

	const workspaceForm = useForm<WorkspaceFormType>({
		resolver: zodResolver(workspaceSchema),
		defaultValues: {
			name: data?.name ?? "",
		},
	});

	const onSubmit: SubmitHandler<WorkspaceFormType> = async data => {
		onLoadingChange(true);

		await delay(1500); //mock delay
		try {
			const response =
				type === "create"
					? await createWorkspaceAction(data)
					: { success: true, message: "update" };

			if (response.success) {
				workspaceForm.reset();
			}
			//add toast unntuk response
		} finally {
			onLoadingChange(false);
		}
	};

	return (
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
	);
}
