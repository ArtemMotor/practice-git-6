/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм". Для того, чтобы проверить, выбран ли checkbox с помощью JavaScript, можно использовать свойство checked . Оно возвращает true , если checkbox выбран, и false , если не выбран.

5) Фильмы должны быть отсортированы по алфавиту */

'use strict'

// Возьмите свой код из предыдущей практики

const movieDB = {
  movies: [
    'Логан',
    'Лига справедливости',
    'Ла-ла лэнд',
    'Одержимость',
    'Скотт Пилигрим против...',
  ],
}

const advertisingSection = document.querySelector('.promo__adv')

const advertisingImg = advertisingSection.querySelectorAll('img')

const advertisingTitle = advertisingSection.querySelector('.promo__adv-title')

const genreFilm = document.querySelector('.promo__genre')

const promoBg = document.querySelector('.promo__bg')

const moviesList = document.querySelector('.promo__interactive-list')

const form = document.querySelector('.add') // получили форму

const confirmBtnInForm = form.querySelector('button') // получили кнопку через форму

const userInputFilm = document.querySelector('.adding__input') // получили инпут куда пользователь вводит название фильма

const btnMakeMovieFavorite = form.querySelector('[type="checkbox"]') // получили кнопку для отметки любимого фильма для задания 4

const delFilmBtns = document.querySelectorAll('.delete')
console.log(delFilmBtns) // NodeList(5)

// ВОТ ТУТ НАЧИНАЕТСЯ РАБОТА С КОРЗИНАМИ
function deleteFilm() {
  console.log('Пока фильм')
}

for (let btn of delFilmBtns) {
  btn.addEventListener('click', deleteFilm)
}

confirmBtnInForm.addEventListener('click', addFilmInList)

function addFilmInList(event) {
  event.preventDefault() // Часть задания 1. Отключили стандартное поведение при нажатии на кнопку в форме. Страница не перезагружается
  if (userInputFilm.value.trim() === '') {
    // простая проверка на пустоту от пользователя
    userInputFilm.value = ''
    userInputFilm.placeholder = 'Введите что-нибудь!'
    userInputFilm.style.border = '2px solid red'
  } else if (
    userInputFilm.value.length > 0 &&
    userInputFilm.value.length <= 21
  ) {
    // поведение если название фильма от 1 до 21 символа
    userInputFilm.style.borderColor = 'rgba(0, 0, 0, 0.19)'
    let userMovie = `${userInputFilm.value[0].toUpperCase()}${userInputFilm.value.slice(
      1
    )}`
    if (btnMakeMovieFavorite.checked === true) {
      console.log('Добавлен любимый фильм')
    } // Задание 4. Если галочка в чекбоксе стоит, то выводим в консоль, что добавлен любимый фильм
    movieDB.movies.push(userMovie) // добавляем полученный фильм в список в movieDB
    movieDB.movies.sort() // сортируем его
    userInputFilm.value = ''
    userInputFilm.placeholder = 'Что уже посмотрено...?'
    moviesList.innerHTML = '' // чистим прошлое содержимое списка на странице

    movieDB.movies.forEach((film, i) => {
      // добавляем фильмы из отсортированного списка из movieDB в список на странице и выполняем 1 задание
      moviesList.innerHTML += `
      <li class="promo__interactive-item">
        ${i + 1}. ${film}
        <div class="delete"></div>
      </li>`
    })
  } else if (userInputFilm.value.length > 21) {
    // Задание 2. Если название фильма больше 21 символа, то мы обрезаем его до 21 символа включительно и добавляем ...
    userInputFilm.style.borderColor = 'rgba(0, 0, 0, 0.19)'
    let userMovie = `${userInputFilm.value[0].toUpperCase()}${userInputFilm.value
      .slice(1, 21)
      .trim()}...`
    if (btnMakeMovieFavorite.checked === true) {
      console.log('Добавлен любимый фильм')
    } // Задание 4. Если галочка в чекбоксе стоит, то выводим в консоль, что добавлен любимый фильм
    movieDB.movies.push(userMovie)
    movieDB.movies.sort()
    userInputFilm.value = ''
    userInputFilm.placeholder = 'Что уже посмотрено...?'
    moviesList.innerHTML = ''

    movieDB.movies.forEach((film, i) => {
      // добавляем фильмы из отсортированного списка из movieDB в список на странице и выполняем 1 задание
      moviesList.innerHTML += `
      <li class="promo__interactive-item">
        ${i + 1}. ${film}
        <div class="delete"></div>
      </li>`
    })
  }
}

advertisingImg.forEach((img) => img.remove())
advertisingTitle.remove()
genreFilm.textContent = 'Драма'
promoBg.style.backgroundImage = "url('img/bg.jpg')"

movieDB.movies.sort()

moviesList.innerHTML = ''

movieDB.movies.forEach((film, i) => {
  moviesList.innerHTML += `
  <li class="promo__interactive-item">
    ${i + 1}. ${film}
    <div class="delete"></div>
  </li>`
})
