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
