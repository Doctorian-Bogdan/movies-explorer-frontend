function checkMovieName({ nameRU, nameEN }, inputValue) {
  const nameRuCheck = nameRU
    .toLowerCase()
    .replace(/[^а-яёa-z0-9]/gi, '')
    .replace(/ё/gi, 'е')
    .includes(
      inputValue
        .toLowerCase()
        .replace(/[^а-яёa-z0-9]/gi, '')
        .replace(/ё/gi, 'е'),
    );

  const nameEnCheck = nameEN
    .toLowerCase()
    .replace(/[^а-яёa-z0-9]/gi, '')
    .replace(/ё/gi, 'е')
    .includes(
      inputValue
        .toLowerCase()
        .replace(/[^а-яёa-z0-9]/gi, '')
        .replace(/ё/gi, 'е'),
    );
  return nameRuCheck || nameEnCheck;
}

export default function Search(movie, inputValue, searchCheckbox) {
  if (searchCheckbox) {
    if (movie.duration > 40) {
      return false;
    }
    return checkMovieName(movie, inputValue);
  }
  return checkMovieName(movie, inputValue);
}
