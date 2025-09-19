export const cleanQueryParams = (
  params: Record<string, unknown> | object,
  numericFields: string[] = ["height", "weight"]
): Record<string, string> => {
  const result: Record<string, string> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "" || value === null)
      return;

    if (numericFields.includes(key)) {
      if (typeof value !== "number" || isNaN(value)) return;
    }

    result[key] = String(value);
  });

  return result;
};
