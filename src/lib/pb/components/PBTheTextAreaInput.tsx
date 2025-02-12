import { TheTextAreaInput } from "@/components/form/inputs/TheTextArea";
import type { IUseFormError } from "@/components/form/useForm";
import type { ClientResponseError } from "pocketbase";

interface PbTheTextAreaInputProps<T>
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  field_name: React.ReactNode;
  field_key: keyof T;
  error_message?: string;
  container_classname?: string;
  label_classname?: string;
  description_classname?: string;
  output_classname?: string;
  editing?: boolean;
  description?: string;
  error?: IUseFormError | null;
  pb_error?: ClientResponseError | null;
}
interface FieldError {
  message: string;
  code: string;
}

export function PbTheTextAreaInput<T>({
  field_name,
  field_key,
  editing = true,
  error,
  pb_error,
  ...props
}: PbTheTextAreaInputProps<T>) {
  const validatin_field_error =
    error?.name === field_key ? error.message : undefined;
  const error_data = pb_error?.data?.data;
  const pb_field_error = error_data?.[field_key] as FieldError | undefined;

  return (
    <TheTextAreaInput
      {...props}
      field_key={field_key}
      field_name={field_name}
      editing={editing}
      error_message={validatin_field_error ?? pb_field_error?.message}
    />
  );
}
