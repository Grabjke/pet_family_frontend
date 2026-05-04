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

  // Ошибки создания питомца - по propertyName
  Birthday: "Неверная дата рождения. Проверьте формат даты",
  OwnersPhoneNumber: "Неверный формат номера телефона. Введите корректный номер",
  Name: "Неверное имя питомца",
  Description: "Неверное описание",
  SpeciesId: "Неверный вид животного",
  BreedId: "Неверная порода",
  Colour: "Неверный окрас",
  HealthInformation: "Неверная информация о здоровье",
  Country: "Неверная страна",
  City: "Неверный город",
  Street: "Неверная улица",
  ZipCode: "Неверный почтовый индекс",
  Weight: "Неверный вес. Укажите положительное число",
  Height: "Неверный рост. Укажите положительное число",
  Castration: "Неверное значение кастрации",
  IsVaccinated: "Неверное значение вакцинации",
  HelpStatus: "Неверный статус помощи",
  VolunteerId: "Неверный ID волонтера",
  Address: "Неверный адрес",

  // Ошибки создания питомца - по кодам
  "birthday.is.invalid": "Дата рождения недопустима",
  "phone.number.is.invalid": "Номер телефона недопустим",
  "name.is.invalid": "Имя питомца недопустимо",
  "description.is.invalid": "Описание недопустимо",
  "species.id.is.invalid": "Вид животного недопустим",
  "breed.id.is.invalid": "Порода недопустима",
  "colour.is.invalid": "Окрас недопустим",
  "health.information.is.invalid": "Информация о здоровье недопустима",
  "country.is.invalid": "Страна недопустима",
  "city.is.invalid": "Город недопустим",
  "street.is.invalid": "Улица недопустима",
  "zip.code.is.invalid": "Почтовый индекс недопустим",
  "weight.is.invalid": "Вес недопустим",
  "height.is.invalid": "Рост недопустим",
  "castration.is.invalid": "Значение кастрации недопустимо",
  "is.vaccinated.is.invalid": "Значение вакцинации недопустимо",
  "help.status.is.invalid": "Статус помощи недопустим",
  "volunteer.id.is.invalid": "ID волонтера недопустим",
  "address.is.invalid": "Адрес недопустим",
};
