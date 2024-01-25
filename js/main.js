import { films } from "./../api/films.js";

const filmsEL = document.querySelector('.films');
let dataFilms = films

// Отрисовать фильмы на странице
function showListFilms(dataFilms, genre) {
  filmsEL.innerHTML = "";
  dataFilms.forEach(film => {
    const filmHTML = `
      <div class="film" data-id-film=${film.id}>
        <div class="film__img">
          <img src="${film.poster}" alt="${film.title}">
        </div>
        <span class="film__rating">IMDM ${film.imdb}</span>
        <h2 class="film__title"><a href="/film.html" class="film__link">${film.title}</a></h2>
        <span class="film__genre">${film.genre[0].toUpperCase()}</span>
      </div>`
    filmsEL.insertAdjacentHTML('beforeend', filmHTML)
  })
}
showListFilms(dataFilms);

// Меню
const menuLinkEl = document.querySelectorAll('.nav-genre__link');
menuLinkEl.forEach(menuItem => {
  menuItem.addEventListener('click', (e) => {
    e.preventDefault();
    const navGenreEl = document.querySelector('.nav-genre');
    const dataAtr = menuItem.dataset.toDisplace;
    console.log(dataAtr)
    navGenreEl.style.left = dataAtr;

    const genre = menuItem.textContent.trim().toLowerCase()

    // Выбор категории фильма
    function getFilterFilms(films, myGgenre) {
      if (myGgenre) {
        const copyDataFilms = [...films].filter(dataFilm => {
          return dataFilm.genre.includes(myGgenre);
        });
        return copyDataFilms;
      } else {
        return dataFilms;
      }
    }

    dataFilms = getFilterFilms(films, genre);
    showListFilms(dataFilms);
  })
})

const btnSearch = document.querySelector('.btn-search');
const search = document.querySelector('.search');
const searchInput = document.querySelector('.search__input');

btnSearch.addEventListener('click', function (e) {
  showListFilms(films);
  e.stopPropagation();
  search.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  searchInput.style.width = "100%";
  searchInput.focus();
})

window.addEventListener('click', function (e) {
  e.stopPropagation();
  if (e.target !== search && e.target !== btnSearch && e.target !== searchInput) {
    search.style.backgroundColor = "";
    searchInput.style.width = "";
    searchInput.value = "";
  }
})

const searchFilm = (s) => {
  const searcFilm = films.filter(film => {
    return film.title.toLowerCase().includes(s);
  })
  console.log("searcFilm:", searcFilm)
  showListFilms(searcFilm);
}

searchInput.addEventListener('input', function () {
  console.log('input.value: ', searchInput.value.toLowerCase())
  searchFilm(searchInput.value.toLowerCase());
})


const getNewFilmPage = () => {
  const listFilms = document.querySelectorAll('.film__link');
  listFilms.forEach(film => {
    film.addEventListener('click', function (e) {

      const currentFilm = e.target.closest('.film');
      localStorage.setItem('idfilm', JSON.stringify(currentFilm.dataset.idFilm));
      // По клику будет создаваться новая html разметка или передаваться данные 
      // createScrenfilm(currentFilm);
    })
  })
}
getNewFilmPage();


