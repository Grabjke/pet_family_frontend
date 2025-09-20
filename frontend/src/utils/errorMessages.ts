export const errorMessages: Record<string, string> = {
  // General errors
  "value.is.invalid": "Значение недопустимо",
  "server.error": "Ошибка сервера",
  "record.not.found": "Запись не найдена",
  "value.is.required": "Значение обязательно для заполнения",
  "record.allready.exist": "Запись уже существует",

  // Species errors
  "species.has.dependencies":
    "Невозможно удалить вид, так как с ним связаны животные",
  "species.or.breed.has.not.exist": "Вид или порода не существуют",

  // Breed errors
  "breed.has.dependencies":
    "Невозможно удалить породу, так как с ней связаны животные",

  // Token errors
  "token.is.expired": "Ваш токен истек",
  "token.is.invalid": "Ваш токен недействителен",

  // User errors
  "credentials.is.invalid": "Неверные учетные данные",

  InvalidUserName: "Имя пользователя может содержать только буквы",
  DuplicateUserName: "Имя пользователя уже занято",
  DuplicateEmail: "Email уже занят",

  // Password validation errors - по кодам
  PasswordRequiresDigit: "Пароль должен содержать хотя бы одну цифру (0-9)",
  PasswordRequiresLower:
    "Пароль должен содержать хотя бы одну строчную букву (a-z)",
  PasswordRequiresUpper:
    "Пароль должен содержать хотя бы одну заглавную букву (A-Z)",
  PasswordRequiresNonAlphanumeric:
    "Пароль должен содержать хотя бы один специальный символ",
  PasswordTooShort: "Пароль слишком короткий",

  // Password validation errors
  "Passwords must have at least one non alphanumeric character.":
    "Пароль должен содержать хотя бы один не алфавитно-цифровой символ",
  "Passwords must have at least one uppercase ('A'-'Z').":
    "Пароль должен содержать хотя бы одну заглавную букву (A-Z)",
  "Passwords must have at least one digit ('0'-'9').":
    "Пароль должен содержать хотя бы одну цифру (0-9)",
  "Passwords must have at least one lowercase ('a'-'z').":
    "Пароль должен содержать хотя бы одну строчную букву (a-z)",
  "Passwords must be at least 6 characters.":
    "Пароль должен содержать не менее 6 символов",
  "Incorrect password.": "Неверный пароль",
  "Password is too short.": "Пароль слишком короткий",
  "Password requires a non-alphanumeric character.":
    "Пароль требует не алфавитно-цифровой символ",
  "Password requires an uppercase character.": "Пароль требует заглавную букву",
  "Password requires a digit.": "Пароль требует цифру",
  "Password requires a lowercase character.": "Пароль требует строчную букву",

  // Дополнительные ошибки из предыдущего списка
  "length.is.invalid": "Неверная длина значения",
  "not.allowed": "Действие запрещено",
  "role.is.invalid": "Неверная роль пользователя",
  "extension.is.invalid": "Недопустимое расширение файла",
  "size.is.invalid": "Недопустимый размер файла",
};
