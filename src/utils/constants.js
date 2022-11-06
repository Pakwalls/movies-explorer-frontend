export const IMAGE_LINK = "https://api.nomoreparties.co";
export const MOVIE_URL = "https://api.nomoreparties.co/beatfilm-movies";
export const DATABASE_URL = "https://api.diproject.nomoredomains.icu";

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
