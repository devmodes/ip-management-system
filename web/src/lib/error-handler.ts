/**
 * TODO: Improve this error function to properly handle the logic of other error status like 401 and 500
 */
export const handleError = (setError: any, errors: any) => {
  if (typeof errors === "object") {
    for (const [key, value] of Object.entries(errors)) {
      if (Array.isArray(value)) {
        setError(key, { message: value[0] });
      }

      if (typeof value === "string") {
        setError(key, { message: value });
      }
    }
  }
};
