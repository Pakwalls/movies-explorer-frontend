import promoLogo from "../../images/promo-logo.svg";

function Promo() {
  return (
    <section className="promo">
      <img src={promoLogo} className="promo__logo" alt="логотип блока" />
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
    </section>
  );
}

export default Promo;
