import { films } from "./../api/films.js";

const buttonBack = document.querySelector('.button-back');
const imgSvg = document.querySelector('.bi-heart');
const btnHeart = document.querySelector('.btn-heart');
const playerWrapper = document.querySelector('.player-wrapper') 

buttonBack.addEventListener('click', function () {
  localStorage.removeItem('idfilm');
})

const idFilm = Number(JSON.parse(localStorage.getItem('idfilm')));

const dataFilm = films.find(film => {
  return film.id === idFilm;
});

const getFilmContent = (film) => {

  const filmHTML = `
  <div class="player">
  <img class="player__img" src="${film.poster}" alt="${film.title}">
  <div class="player-gradinet"></div>
  <div class="play">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" class="bi bi-play-fill"
      viewBox="0 0 16 16">
      <path
        d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
    </svg>
  </div>
  <div class="player__genre">
    <img src="./img/film.svg" alt="">
    <span>${film.genre[0]}<span>
  </div>
  <h2 class="player__title">
  ${film.title}
  </h2>
  <div class="player__info">
    <div class="player__info-imdb">IMDB ${film.imdb}</div>
    <div class="player__info-time">${film.time}</div>
    <div class="player__info-date">${film.date}</div>
  </div>
</div>
<div class="film-tabs">
  <button class="film-tab active">О фильме</button>
  <button class="film-tab">Актеры</button>
  <button class="film-tab">Фотографии</button>
</div>
<div class="film-tab__wrapper">
  <div class="film-tab__about film-tab__item" data-tab="0">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat fugit laudantium laboriosam alias facilis
    qui
    assumenda nesciunt. Sed iste error aperiam maiores, voluptatem at ullam, enim alias debitis quisquam
    quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat fugit laudantium laboriosam
    alias facilis qui
    assumenda nesciunt. Sed iste error aperiam maiores, voluptatem at ullam, enim alias debitis quisquam
    quibusdam.
  </div>
  <div class="film-tab__cast film-tab__item hidden" data-tab="1">
    <div class="cast">
      <div class="cast__img">
        <img src="./img/sasa.jpg" alt="">
      </div>
      <div class="cast__title">Саша</div>
    </div>
    <div class="cast">
      <div class="cast__img">
        <img src="./img/sasa.jpg" alt="">
      </div>
      <div class="cast__title">Саша</div>
    </div>

  </div>
  <div class="film-tab__photo film-tab__item hidden" data-tab="2">

    <div class="photo">
      <img src="./img/sasa.jpg" alt="">
    </div>
    <div class="photo">
      <img src="./img/sasa.jpg" alt="">
    </div>
    <div class="photo">
      <img src="./img/sasa.jpg" alt="">
    </div>
  </div>
</div>
  `;
  playerWrapper.insertAdjacentHTML('beforeend',filmHTML )

}

getFilmContent(dataFilm)

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



