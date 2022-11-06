import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="not-found">
      <h2 className="not-found__code">404</h2>
      <p className="not-found__title">Страница не найдена</p>
      <Link to="/" className="not-found__link">
        Назад
      </Link>
    </section>
  );
}

export default NotFound;
