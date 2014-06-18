var Model = require('./Model');


var model = module.exports = new Model([
  {
    text: "Здравствуй, Хрюша",
  },
  {
    text: "Пошел на обед",
  },
  {
    text: "Привет :) Как дела?",
  },
  {
    text: "Я думаю, пришло время похакать <script>alert('Баг')</script>",
  },
  {
    text: "Мой дядя самых честных правил, Когда не в шутку занемог, Он уважать себя заставил И лучше выдумать не мог.",
  },
  {
    text: "Уходите по-английски. Не дожидайтесь, пока вас пошлют по-русски.",
  },
  {
    text: "Любого человека, ничего ему не объясняя, можно посадить в тюрьму лет на десять, и где-то в глубине души он будет знать, за что.",
  },
  {
    text: "Любого человека, ничего ему не объясняя, можно посадить в тюрьму лет на десять, и где-то в глубине души он будет знать, за что.",
  },
  {
    text: "Дедушка Фрейд попробовал все. И все, что ему не понравилось, отнес к извращениям.",
  },
  {
    text: "Путь к мужчине лежит: для красивых женщин - через желудок, для некрасивых - через печень.",
  },
  {
    text: "Качественный офисный стол просто обязан выдерживать двоих...",
  },
  {
    text: "Если болт нужно забить аккуратно, его вкручивают.",
  },
  {
    text: "Если человек ест тараканов от скуки, то его показывают в передаче \"Фактор страха\", а если от голода, то в передаче \"Вести регионов России\".",
  },
  {
    text: "Если система работает, то и средневзвешенный дурак во главе не сильно повредит, если система не работает, то и средневзешенный умник во главе сильно не поможет.",
  },
  {
    text: "Если бы вам удалось надавать под зад человеку, виноватому в большинстве ваших неприятностей, — вы бы неделю не смогли сидеть.",
  },
  {
    text: "Ему так везло, как будто он нашел подкову от слона.",
  },
  {
    text: "Если Вы одолжили кому-то 20 баксов и больше уже не встречаете этого человека, то, возможно, это того стоило.",
  },
  {
    text: "Не судите человека по его друзьям; не забудьте, что у Иуды друзья были безукоризненны.",
  },
  {
    text: "Говорят у носорога слабое зрение. Но при его весе это уже не его проблемы.",
  },
  {
    text: "Кто не рискует, тот не пьет шапанского!... и валидола.",
  },
  {
    text: "Все люди живут по одним принципам, но по-разному их нарушают.",
  },
  {
    text: "Если о творчестве человека говорят «чувствуется школа», то часто имеют в виду, что до института дело не дошло.",
  },
  {
    text: "Если вместо ужина, попасть домой к завтраку, то можно остаться и без обеда.",
  },
  {
    text: "Если бы Эдисон не изобрел электричество - до сих пор бы смотрели телевизор при свечах.",
  },
  {
    text: "Дети - цветы жизни.Собрал букет - подари бабушке.",
  },
  {
    text: "Макияж позволяет женщине скрывать, что написано у нее на лице.",
  },
  {
    text: "В поисках приключений главную роль играет не голова.",
  },
  {
    text: "Если правда все равно всплывает, значит, она... не тонет?",
  },
  {
    text: "Меньше будешь в интернете - здоровее будут дети!",
  },
  {
    text: "Возраст определяется не по годам, а по количествам зверски убитых иллюзий.",
  },
  {
    text: "Чем чаще женщина стонет ночью, тем реже она ворчит днем.",
  },
  {
    text: "Если человек, а тем более начальник, несет чушь, отойди и не мешай, иначе он тебя же ею же и нагрузит.",
  },
  {
    text: "Женщина - хранительница очага, в котором сжигается семейный бюджет.",
  },
  {
    text: "Красиво жить не запретишь. Но помешать можно...",
  },
  {
    text: "История Змея Горыныча убедительно показала - чем ты головастей, тем больше охотников с тобой разделаться.",
  }
], null);

var getAt = model.getAt;

/**
 * @param {number} index
 * @param {Date=} opt_date
 * @return {ChatMessages.Item}
 */
model.getAt = function(index, opt_date) {
  var chatMessage = getAt.call(model, index);

  if (chatMessage && opt_date) {
    chatMessage.date = model.getIsoDate(opt_date);
    chatMessage.timestamp = +opt_date;
  }

  return chatMessage;
};