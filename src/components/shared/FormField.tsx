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
	renderInput?: (
		field: ControllerRenderProps<TFieldValues, TName>,
		invalid: boolean,
	) => React.ReactNode;
};

export function FormField<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>,
>({ control, name, label, renderInput }: FormFieldProps<TFieldValues, TName>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor={field.name}>{label}</FieldLabel>

					{renderInput && renderInput(field, fieldState.invalid)}
					{fieldState.error && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);
}
