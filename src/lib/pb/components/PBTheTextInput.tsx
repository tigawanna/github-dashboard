import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import type { IUseFormError } from "@/components/form/useForm";
import type { ClientResponseError } from "pocketbase";

interface PbTheTextInputProps<T>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  field_name: React.ReactNode;
  field_key: keyof T;
  error_message?: string;
  container_classname?: string;

  label_classname?: string;
  description_classname?: string;
  output_classname?: string;
  editing?: boolean;
  description?: string;
  val?: string | Date | URL | number | readonly string[] | undefined;
  validation_error?: IUseFormError | null;
  pb_error?: ClientResponseError | null;
}
interface FieldError {
  message: string;
  code: string;
}

export function PbTheTextInput<T>({
  field_name,
  field_key,
  editing = true,
  validation_error,
  className,
  pb_error,
  ...props
}: PbTheTextInputProps<T>) {
  const validation_field_error =
    validation_error?.name === field_key ? validation_error.message : undefined;
  const error_data = pb_error?.data?.data;
  const pb_field_error = error_data?.[field_key] as FieldError | undefined;

  return (
    <TheTextInput
      {...props}
      className={className}
      label_classname={props.label_classname}
      field_key={field_key}
      field_name={field_name}
      editing={editing}
      val={props.val ?? props.value ?? ""}
      error_message={validation_field_error ?? pb_field_error?.message}
    />
  );
}
