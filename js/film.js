import { films } from "./../api/films.js";

const buttonBack = document.querySelector('.button-back');
const imgSvg = document.querySelector('.bi-heart');
const btnHeart = document.querySelector('.btn-heart');

buttonBack.addEventListener('click', function () {
  localStorage.removeItem('idfilm');
})

const idFilm = Number(JSON.parse(localStorage.getItem('idfilm')));

const dataFilm = films.find(film => {
  return film.id === idFilm;
});

const getPlayer = () => {
}
let localStorageHeart = [];

const btnFilmTabs = document.querySelectorAll('.film-tab');

btnFilmTabs.forEach((btnFilmTab, index) => {
  btnFilmTab.addEventListener('click', function () {
    document.querySelector('.film-tab.active') && document.querySelector('.film-tab.active').classList.remove('active');
    this.classList.add('active');
    const filmTabItems = document.querySelectorAll('.film-tab__item');
    filmTabItems.forEach(filmTabItem => {
      filmTabItem.classList.add('hidden');
      if (index === Number(filmTabItem.dataset.tab)) filmTabItem.classList.remove('hidden');
    })
  })
})




if (localStorage.getItem('heart')) {
  localStorageHeart = JSON.parse(localStorage.getItem('heart'));
  if (localStorageHeart.includes(dataFilm.id)) {
    imgSvg.classList.add('heart');
  }
}



// localStorage.getItem(dataFilm.id) && document.querySelector('.bi-heart').classList.add('heart');

btnHeart.addEventListener('click', function () {
  if (imgSvg.classList.contains('heart')) {
    imgSvg.classList.remove('heart');
    localStorageHeart = [...localStorageHeart].filter(id => {
      return id !== dataFilm.id;
    })
    localStorage.setItem('heart', JSON.stringify(localStorageHeart));

  } else {
    imgSvg.classList.add('heart');

    if (!localStorageHeart.includes(dataFilm.id)) {
      localStorageHeart.push(dataFilm.id)
      localStorage.setItem('heart', JSON.stringify(localStorageHeart));
    }
  }
})



