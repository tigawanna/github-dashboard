import { Description } from "@radix-ui/react-dialog";

export function humanReadableGQLError(
  error: Error,
  defaultTitle: string
): { title: string; description: string } {
  if (error.message?.includes("INSUFFICIENT_SCOPES")) {
    return {
      title: "Insufficient Scopes",
      description: `
      Your current token doen't have enough scopes to perform this action`,
    };
  }
  if (error.message.includes("NOT_FOUND")) {
    return {
      title: "Resource not found",
      description: `The Resource you are trying to delete is not found`,
    };
  }
  return { title: defaultTitle, description: error.message };
}
