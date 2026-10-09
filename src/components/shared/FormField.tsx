import {
	Controller,
	ControllerRenderProps,
	type Control,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";

type FormFieldProps<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>,
> = {
	control: Control<TFieldValues>;
	name: TName;
	label: string;
	isOptional?: boolean;
	renderInput?: (
		field: ControllerRenderProps<TFieldValues, TName>,
		invalid: boolean,
	) => React.ReactNode;
};

export function FormField<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>,
>({
	control,
	name,
	label,
	renderInput,
	isOptional = false,
}: FormFieldProps<TFieldValues, TName>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<div className="flex gap-2 items-end">
						<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
						{isOptional && (
							<span className="text-xs text-muted-foreground">(opsional)</span>
						)}
					</div>

					{renderInput && renderInput(field, fieldState.invalid)}
					{fieldState.error && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);
}
