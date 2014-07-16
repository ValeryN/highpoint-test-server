# HighPoint Test Server

Тестовый сервер для разработчиков мобильных и веб клиентов.


## Требования

- [ImageMagic](http://www.imagemagick.org/)
- [libwebp](https://developers.google.com/speed/webp/download)


## Установка

- пакеты Node.js, команда для установки: `npm install`
- конфиг серверного приложения:
  `cp application/config.sample.js application/config.js`


## Запуск окружения для разработки

`make app` или `node app` — запуск тестового сервера. По умолчанию приложение
будет доступно по адресу [http://localhost:3002/](http://localhost:3002/)

[http://localhost:3002/panel](http://localhost:3002/panel) — девелоперская панель
