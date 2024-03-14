export const regName = /^[a-z а-я ё \s -]{2,30}$/i;

export const itemWidth = {
  threeColumns: 1000,
  twoColumns: 500,
};

export const numberOfDisplayedMovies = {
  pcScreen: {
    width: 1000,
    display: 12,
    add: 3,
  },
  tabletScreen: {
    width: 500,
    display: 8,
    add: 2,
  },
  mobileScreen: {
    width: 500,
    display: 5,
    add: 2,
  },
};

export function setMovieDuration(movieData) {
  const movieDurationHours = Math.floor(movieData.duration / 60);
  return `${movieDurationHours}ч ${movieData.duration - movieDurationHours * 60}мин`;
}
