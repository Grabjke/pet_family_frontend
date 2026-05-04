import { errorMessages } from "./errorMessages";

interface ApiError {
  status?: number;
  data?: {
    errors?: Array<{
      code?: string;
      message?: string;
      propertyName?: string;
      type?: number;
    }>;
    result?: null;
    timeGenerated?: string;
  };
}

/**
 * Извлекает понятные сообщения об ошибках из ответа API
 */
export function extractApiErrors(error: unknown): string[] {
  const apiError = error as ApiError;
  const messages: string[] = [];

  if (!apiError?.data?.errors) {
    return ["Произошла ошибка. Попробуйте позже."];
  }

  for (const err of apiError.data.errors) {
    // Сначала пробуем найти сообщение по propertyName
    if (err.propertyName) {
      const propertyMessage = errorMessages[err.propertyName];
      if (propertyMessage) {
        messages.push(propertyMessage);
        continue;
      }
    }

    // Если не нашли по propertyName, пробуем по code
    if (err.code) {
      const codeMessage = errorMessages[err.code];
      if (codeMessage) {
        messages.push(codeMessage);
        continue;
      }
    }

    // Если не нашли ни по propertyName, ни по code, используем message из API
    if (err.message) {
      messages.push(err.message);
    }
  }

  return messages.length > 0 ? messages : ["Произошла ошибка. Попробуйте позже."];
}

/**
 * Показывает ошибки валидации формы из ответа API
 * Возвращает объект с ошибками для полей формы
 */
export function mapApiErrorsToFormErrors(
  error: unknown,
): Record<string, string> {
  const apiError = error as ApiError;
  const formErrors: Record<string, string> = {};

  if (!apiError?.data?.errors) {
    return formErrors;
  }

  for (const err of apiError.data.errors) {
    if (!err.propertyName) continue;

    // Преобразуем propertyName из PascalCase в camelCase для формы
    const fieldName = pascalToCamelCase(err.propertyName);

    // Сначала пробуем найти сообщение по propertyName
    const propertyMessage = errorMessages[err.propertyName];
    if (propertyMessage) {
      formErrors[fieldName] = propertyMessage;
      continue;
    }

    // Если не нашли по propertyName, пробуем по code
    if (err.code) {
      const codeMessage = errorMessages[err.code];
      if (codeMessage) {
        formErrors[fieldName] = codeMessage;
        continue;
      }
    }

    // Если не нашли ни по propertyName, ни по code, используем message из API
    if (err.message) {
      formErrors[fieldName] = err.message;
    }
  }

  return formErrors;
}

/**
 * Преобразует PascalCase в camelCase
 * Пример: Birthday -> birthday, OwnersPhoneNumber -> ownersPhoneNumber
 */
function pascalToCamelCase(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}
