export const cleanQueryParams = (
  params: Record<string, unknown> | object,
  numericFields: string[] = ["height", "weight"]
): Record<string, string> => {
  const result: Record<string, string> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined) return;

    if (value === "") return;

    if (typeof value === "number" && isNaN(value)) return;

    if (numericFields.includes(key)) {
      if (typeof value !== "number" || isNaN(value)) return;
    }

    if (typeof value === "boolean" && !value) return;

    result[key] = String(value);
  });

  return result;
};
