import { useState } from "react";

export interface IUseFormHook<T extends Record<string, any>> {
  initialValues: T;
}
export interface IUseFormError {
  name: string;
  message: string;
}
export type IUseFormErrors<T extends Record<string, any>> = {
  [K in keyof T]: {
    name: string;
    message: string;
  };
};

export function useFormHook<T extends Record<string, any>>({
  initialValues,
}: IUseFormHook<T>) {
  const [input, setInput] = useState(initialValues);
  const [error, setError] = useState<IUseFormError>({ message: "", name: "" });
  const [errors, setErrors] = useState<IUseFormErrors<T> | undefined>();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setInput({
      ...input,
      [e.target.id]: e.target.value,
    });
  }

  function validateInputs(checker: (inpt: T) => boolean) {
    setError({ name: "", message: "" });
    return checker(input);
  }

  return {
    input,
    setInput,
    handleChange,
    error,
    setError,
    errors,
    setErrors,
    validateInputs,
  };
}
