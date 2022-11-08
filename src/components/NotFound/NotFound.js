import { useHistory } from "react-router-dom";
import {} from "react-router";
import React, { useRef } from "react";

function NotFound() {
  const history = useHistory();
  const count = useRef(0);
  const handleBackClick = () => {
    count.current++;

    history.goBack();
  };

  return (
    <section className="not-found">
      <h2 className="not-found__code">404</h2>
      <p className="not-found__title">Страница не найдена</p>
      <button onClick={() => handleBackClick()} className="not-found__link">
        Назад
      </button>
    </section>
  );
}

export default NotFound;
