/**
 * @param {number} limit количество подгружаемых айтемов
 * @param {Array} data все карточки сохранненые в локал сторадже
 * @param {number} currentDataLength длина массива загруженных карт
 * @param {Object} filters Обьект с фильртами
 * @param {boolean} filters.isShort фильтр для коротких фильмов
 * @param {string} filters.search искомое значение
 * @returns {Object} Возвращается обьект с ключами isHaveNext - есть ли еще карточки для загрузки, и nextItems - следующие карточки
 */
export const loadNextIems = (limit, data, currentDataLength, filters) => {
  const filteredCards = data
    .filter((card) => {
      const searchCondition = !!card.nameRU
        .toLowerCase()
        .match(filters.search.toLowerCase());
      if (filters.isShorts) {
        const isShortCondition = card.duration <= 40;
        return searchCondition && isShortCondition;
      }
      return searchCondition;
    })
    .slice(currentDataLength, currentDataLength + limit);

  const isHaveNext = data.length !== currentDataLength + filteredCards.length;

  return {
    isHaveNext,
    nextItems: filteredCards,
  };
};
