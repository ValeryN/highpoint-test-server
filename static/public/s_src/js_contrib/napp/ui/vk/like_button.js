goog.provide('napp.ui.vk.LikeButton');
goog.provide('napp.ui.vk.LikeButton.Type');
goog.provide('napp.ui.vk.LikeButton.Verb');

goog.require('npf.ui.Component');


/**
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {npf.ui.Component}
 */
napp.ui.vk.LikeButton = function(opt_domHelper) {
  napp.ui.vk.LikeButton.base(this, 'constructor', opt_domHelper);

  /**
   * Высота кнопки в пикселях. Допустимые значения: 18, 20, 22, 24.
   * @type {number}
   */
  this.height = 22;

  /**
   * @private {boolean}
   */
  this.inited_ = false;

  /**
   * Описание страницы для отображения в превью у записи на стене
   * @type {string}
   */
  this.pageDescription = '';

  /**
   * Идентификатор страницы. Используется в случае, если у одной статьи
   * несколько адресов, а также на динамических сайтах, у которых меняется
   * только хэш. Также применяется для снятия кэша со страницы.
   * Значение по умолчанию — контрольная сумма от location.href.
   * @type {number|undefined}
   */
  this.pageId = undefined;

  /**
   * Адрес картинки-миниатюры для отображения в превью у записи на стене
   * @type {string}
   */
  this.pageImage = '';

  /**
   * Название страницы для отображения в превью у записи на стене
   * @type {string}
   */
  this.pageTitle = '';

  /**
   * Адрес страницы для отображения у записи на стене
   * Указывается в случае, если адрес страницы отличается от адреса,
   * на котором отображается кнопка.
   * @type {string}
   */
  this.pageUrl = '';

  /**
   * Текст, который будет опубликован на стене после нажатия "Рассказать друзьям"
   * Максимальная длина — 140 символов
   * Значение по умолчанию — название страницы
   * @type {string}
   */
  this.text = '';

  /**
   * Вариант дизайна кнопки
   * @type {napp.ui.vk.LikeButton.Type}
   */
  this.type = napp.ui.vk.LikeButton.Type.FULL;

  /**
   * Вариант формулировки текста внутри кнопки
   * @type {napp.ui.vk.LikeButton.Verb}
   */
  this.verb = napp.ui.vk.LikeButton.Verb.LIKE;

  /**
   * Ширина блока в пикселах (только для type = napp.ui.vk.LikeButton.Type.FULL)
   * Должно быть больше 200
   * @type {number}
   */
  this.width = 350;
};
goog.inherits(napp.ui.vk.LikeButton, npf.ui.Component);


/**
 * @enum {string}
 */
napp.ui.vk.LikeButton.Type = {
  BUTTON: 'button', // Кнопка с миниатюрным счетчиком
  FULL: 'full', // Кнопка с текстовым счетчиком
  MINI: 'mini', // Миниатюрная кнопка
  VERTICAL: 'vertical' // Миниатюрная кнопка, счетчик сверху
};

/**
 * @enum {number}
 */
napp.ui.vk.LikeButton.Verb = {
  INTERESTING: 1,
  LIKE: 0
};


/** @inheritDoc */
napp.ui.vk.LikeButton.prototype.createDom = function() {
  napp.ui.vk.LikeButton.base(this, 'createDom');

  /** @type {Element} */
  var element = this.getElement();
  element.id = this.getId();
};

/** @inheritDoc */
napp.ui.vk.LikeButton.prototype.enterDocument = function() {
  napp.ui.vk.LikeButton.base(this, 'enterDocument');

  if (!this.inited_) {
    this.inited_ = true;

    var attrs = {
      'type': this.type,
      'height': this.height,
      'verb': this.verb
    };

    if (napp.ui.vk.LikeButton.Type.FULL == this.type) {
      attrs['width'] = this.width;
    }

    if (this.pageTitle) {
      attrs['pageTitle'] = this.pageTitle;
    }

    if (this.pageDescription) {
      attrs['pageDescription'] = this.pageDescription;
    }

    if (this.pageUrl) {
      attrs['pageUrl'] = this.pageUrl;
    }

    if (this.pageImage) {
      attrs['pageImage'] = this.pageImage;
    }

    if (this.text) {
      attrs['text'] = this.text;
    }

    this.getDomHelper().getWindow()['VK']['Widgets']['Like'](
      this.getId(), attrs, this.pageId);
  }
};
