export const IMAGE_LINK = "https://api.nomoreparties.co";
export const MOVIE_URL = "https://api.nomoreparties.co/beatfilm-movies";
export const DATABASE_URL = "https://api.diproject.nomoredomains.icu";

export const SHORT_DURATION = 40;

export const LARGE_COUNT = 12;
export const MEDIUM_COUNT = 8;
export const SMALL_COUNT = 5;

export const LARGE_PAGGINATOR = 3;
export const MEDIUM_PAGGINATOR = 2;

export const LARGE_BRAKEPOINT = 1140;
export const MEDIUM_BRAKEPOINT = 712;
export const EMAIL_ERR_MESSAGE = "Введено некоректное значение в поле Email";
export const FILTER_MESSAGE = "Ничего не найдено...";
export const FILTER_ERR_MESSAGE =
  "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";
export const NAME_BTN_SAVE = "Сохранить";
export const NAME_BTN_EDIT = "Редактировать";
export const NAME_MSG_SUCCESS = "Сохранено!";

export const SEACH_ERROR = "Нужно ввести ключевое слово";

export const ERRORS = {
  LOGIN: {
    INVALID_DATA_ERROR: "Вы ввели неправильный логин или пароль.",
    AUTHORIZE_ERROR:
      "При авторизации произошла ошибка. Токен не передан или передан не в том формате.",
    TOKEN_ERROR:
      "При авторизации произошла ошибка. Переданный токен некорректен.",
  },
  REGISTER: {
    SERVER_ERROR: "При регистрации пользователя произошла ошибка.",
  },
  PROFILE: {
    SERVER_ERROR: "При обновлении профиля произошла ошибка.",
  },
  OTHER: {
    INTERNAL_SERVER_ERROR: "500 На сервере произошла ошибка.",
    NOT_FOUND_ERROR: "404 Страница по указанному маршруту не найдена.",
  },
  EMAIL_EXIST_ERROR: "Пользователь с таким email уже существует.",
};
