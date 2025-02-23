

export async function sleep(delay: number) {
  await new Promise((resolve) => setTimeout(resolve, delay));
}




export interface ErrorNotData {
  error: {
    message: any;
    original_error: any;
  };
}

export type DataOrError<T> = T | ErrorNotData;

export function narrowOutError<T = unknown>(data?: DataOrError<T>) {
  // @ts-expect-error
  if (data && !("error" in data)) {
    return data;
  }
}

/**
 * A utility function to handle promise-based operations with try-catch.
 * 
 * @template T - The type of the resolved value from the promise.
 * @template E - The type of the error, defaults to `Error`.
 * @param {Promise<T>} fn - The promise to be executed.
 * @returns {Promise<{ data: T | null; error: E | null }>} An object containing 
 * either the resolved data or the caught error.
 * 
 * @example
 * ```ts
 * const { data, error } = await tryCatchWrapper(fetchData());
 * ```
 * 
 */

export async function tryCatchWrapper<T, E = Error>(
  fn: Promise<T>,
): Promise<{ data: T | null; error: E | null }> {
  try {
    const data = await fn;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
}


