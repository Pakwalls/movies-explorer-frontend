import { Link } from "react-router-dom";
import avatar from "../../images/about-avatar.jpg";

function AboutMe() {
  return (
    <section className="about-me" id="aboutMe">
      <h2 className="section-title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__name">Вячеслав</h3>
          <p className="about-me__subname">Фронтенд-разработчик, 36 лет</p>
          <p className="about-me__text">
            Я родился в столице Приднестровья, Тирасполе. Живу в Москве, да,
            тоже столица, только чуть-чуть побольше. Учился Технологии
            Машиностроения и Экономике. Пробовал много профессий и увлечений:
            начинал с кровли мягких крыш и системного администрирования,
            участвовал в управлении большим складом, управлении снабжения сетью
            цветочных магазинов, анализировал продажи. Искал, искал... и нашел !
            Курс WEBDEV !
          </p>
          <Link
            to={{ pathname: "https://github.com/Pakwalls" }}
            className="about-me__link"
            target="_blank"
          >
            Github
          </Link>
        </div>
        <img alt="аватар" src={avatar} className="about-me__avatar" />
      </div>
    </section>
  );
}

export default AboutMe;
