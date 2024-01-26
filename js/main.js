import { films } from "./../api/films.js";

const filmsEL = document.querySelector('.films');
let dataFilms = films
const heartList = document.querySelector('.heart-list');


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

function updateHeart() {
  if (localStorage.getItem('heart')) {
    const heartQuantity = document.querySelector('.btn-heart__quantity');
    const localStorageHeart = JSON.parse(localStorage.getItem('heart'));
    localStorageHeart.length > 0 ? heartQuantity.textContent = localStorageHeart.length : heartQuantity.textContent = '';
    const biBell = document.querySelector('.bi-bell');
    localStorageHeart.length ? biBell.style.fill = '#ffd645' : biBell.style.fill = ''
  }
}
updateHeart();


const btnHeart = document.querySelector('.btn-heart');
let localStorageHeart = JSON.parse(localStorage.getItem('heart'));
  
function getHeartsList() {
  localStorage.getItem('heart') && btnHeart.addEventListener('click', function (e) {
    e.preventDefault()
    e.stopPropagation()
    heartList.innerHTML = '';
    console.log(heartList)
    heartList.classList.contains('heart-list--none')
      ? heartList.classList.remove('heart-list--none')
      : heartList.classList.add('heart-list--none');
    
    const heartFilms = dataFilms.filter(dataFilm => {
      return localStorageHeart.includes(dataFilm.id) && dataFilm;
    })
  
    heartFilms.forEach(heartFilm => {
      const heartListHtml = `
      <li class="heart-item" data-id-heart=${heartFilm.id}>
      <img class="heart-item__img" src="${heartFilm.poster}" alt="${heartFilm.title}">
      <a class="heart-item__link" href="/film.html">${heartFilm.title}</a>
      <button class="heart-item__del">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-bucket"
          viewBox="0 0 16 16">
          <path
            d="M2.522 5H2a.5.5 0 0 0-.494.574l1.372 9.149A1.5 1.5 0 0 0 4.36 16h7.278a1.5 1.5 0 0 0 1.483-1.277l1.373-9.149A.5.5 0 0 0 14 5h-.522A5.5 5.5 0 0 0 2.522 5m1.005 0a4.5 4.5 0 0 1 8.945 0zm9.892 1-1.286 8.574a.5.5 0 0 1-.494.426H4.36a.5.5 0 0 1-.494-.426L2.58 6h10.838z" />
        </svg>
      </button>
    </li>
      `
      heartList.classList.remove('heart-list--none')
      heartList.insertAdjacentHTML('beforeend', heartListHtml)
    })
  
      const btnsDel = document.querySelectorAll('.heart-item__del');
  
      btnsDel.forEach(btnDel => {
        btnDel.addEventListener('click', function(e) {
          const heartItemEl = e.target.closest('.heart-item')
          console.log(localStorageHeart)
          localStorageHeart = [...localStorageHeart].filter(id => {
            return id !== Number(heartItemEl.dataset.idHeart);
          })
          localStorage.setItem('heart', JSON.stringify(localStorageHeart));
          e.target.closest('.heart-item').remove();
          updateHeart();
        })

      })
  })
}
getHeartsList();



window.addEventListener('click', function (e) {
  if (!e.target.closest('.heart-list') && !e.target.closest('.heart-item__del')) {
    heartList.classList.add('heart-list--none')
  }
  if (localStorageHeart.length < 1) heartList.classList.add('heart-list--none')
})


