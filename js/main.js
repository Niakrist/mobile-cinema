import { films } from "./../api/films.js";

const filmsEL = document.querySelector('.films');
let dataFilms = films

console.log('dataFilms')

function showListFilms(dataFilms, genre) {
  filmsEL.innerHTML = "";
  dataFilms.forEach(film => {
    const filmHTML = `
      <div class="film">
        <div class="film__img">
          <img src="${film.poster}" alt="${film.title}">
        </div>
        <span class="film__rating">IMDM ${film.imdb}</span>
        <h2 class="film__title">${film.title}</h2>
        <span class="film__genre">${film.genre[0].toUpperCase()}</span>
      </div>`
    filmsEL.insertAdjacentHTML('beforeend', filmHTML)
  })
}
showListFilms(dataFilms);