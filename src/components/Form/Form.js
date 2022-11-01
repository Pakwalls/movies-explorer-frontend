function Form({ formData, handleChange, handleSubmit, errors, btnText, isLogin = false }) {
  return (
    <form className="form__plate" onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
        {!isLogin &&
          <>
            <label htmlFor="form__name" className="form__label">Имя</label>
            <input
              value={formData.name}
              onChange={handleChange}
              id="name-input"
              className="form__input"
              type="text"
              name="name"
              placeholder="Имя"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="form__error">{errors.name}</span>
          </>}
        <label htmlFor="email" className="form__label">E-mail</label>
        <input
          value={formData.email}
          onChange={handleChange}
          id="email-input"
          className="form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <span className="form__error">{errors.email}</span>
        <label htmlFor="password" className="form__label">Пароль</label>
        <input
          value={formData.password}
          onChange={handleChange}
          id="password-input"
          className="form__input"
          type="password"
          name="password"
          placeholder="Пароль"
          required
        />
        <span className="form__error">{errors.password}</span>
      </fieldset>
      <button type="submit" className="form__submit-button hovered-item">{btnText}</button>
    </form>
  )
};

export default Form;