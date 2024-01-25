import { films } from "./../api/films.js";

const buttonBack = document.querySelector('.button-back');

buttonBack.addEventListener('click', function () {
  localStorage.removeItem('idfilm');
})

const idFilm = Number(JSON.parse(localStorage.getItem('idfilm')));

const dataFilm = films.find(film => {
  return film.id === idFilm;
});
console.log('dataFilm:', dataFilm);

const getPlayer = () => {
    

}