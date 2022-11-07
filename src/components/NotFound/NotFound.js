import { Link, useHistory } from "react-router-dom";

function NotFound() {
  const history = useHistory();

  const handleBackClick = () => {
    history.goBack();
  };

  return (
    <section className="not-found">
      <h2 className="not-found__code">404</h2>
      <p className="not-found__title">Страница не найдена</p>
      <button onClick={handleBackClick} className="not-found__link">
        Назад
      </button>
    </section>
  );
}

export default NotFound;
