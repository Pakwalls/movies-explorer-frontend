function AboutProject() {
  return (
    <section className="about-project" id="aboutProject">
      <h2 className="section-title">О проекте</h2>
      <div className="about-project__articles">
        <article className="about-project__article">
          <h3 className="about-project__title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__description">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </article>
        <article className="about-project__article">
          <h3 className="about-project__title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </article>
      </div>
      <div className="about-project__stages">
        <p className="about-project__stage about-project_stage_colorized">
          1 неделя
        </p>
        <p className="about-project__stage">4 недели</p>
        <p className="about-project__substage">Back-end</p>
        <p className="about-project__substage">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
