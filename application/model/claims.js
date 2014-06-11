var Model = require('./model').Model;

var ClaimType = {
  AVATAR: 'avatar',
  INSULT: 'insult',
  SEX: 'sex'
};

var model = module.exports = new Model([
  {
    type: ClaimType.AVATAR,
    text: 'Пользователь считает, что ваш аватар не подходит вам',
  },
  {
    type: ClaimType.INSULT,
    text: 'Пользователь оскорблен вами',
  },
  {
    type: ClaimType.SEX,
    text: 'Пользователю не нравятся ваши навязчивые сексуальные идеи',
  },
], null);
