# Проект фильмы
https://api.movies.gilyova.nomoredomains.xyz

## Endpoins:
* GET /users/me - возвращает информацию о пользователе (email и имя)
* PATCH /users/me - обновляет информацию о пользователе (email и имя)
* GET /movies - возвращает все сохранённые текущим  пользователем фильмы
* POST /movies - создаёт фильм с переданными в теле
country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
* DELETE /movies/_id - удаляет сохранённый фильм по id
* POST /signup - создаёт пользователя с переданными в теле email, password и name
POST /signup
* POST /signin - проверяет переданные в теле почту и пароль и возвращает JWT