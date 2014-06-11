goog.provide('napp.ui.vk.Comments');
goog.provide('napp.ui.vk.Comments.Attach');
goog.provide('napp.ui.vk.Comments.Size');

goog.require('npf.ui.Component');


/**
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {npf.ui.Component}
 */
napp.ui.vk.Comments = function(opt_domHelper) {
  napp.ui.vk.Comments.base(this, 'constructor', opt_domHelper);

  /**
   * Типа прикреплений к комментариям
   * @type {napp.ui.vk.Comments.Attach|Array.<napp.ui.vk.Comments.Attach>}
   */
  this.attach = napp.ui.vk.Comments.Attach.ALL;

  /**
   * Автоматическая публикация комментария в статус пользователя
   * @type {boolean}
   */
  this.autoPublish = true;

  /**
   * Максимальная высота виджета в пикселях (> 500)
   * 0 — высота не ограничена
   * @type {string}
   */
  this.height = 0;

  /**
   * @private {boolean}
   */
  this.inited_ = false;

  /**
   * Количество комментариев на странице (5-100)
   * @type {napp.ui.vk.Comments.Type}
   */
  this.limit = 10;

  /**
   * Отключает обновление ленты комментариев в реальном времени
   * @type {boolean}
   */
  this.noRealTime = false;

  /**
   * Идентификатор страницы. Используется в случае, если у одной статьи несколько
   * адресов, а также на динамических сайтах, у которых меняется только хэш.
   * Также применяется для снятия кэша со страницы.
   * Значение по умолчанию — контрольная сумма от location.href.
   * @type {number|undefined}
   */
  this.pageId;

  /**
   * Адрес страницы с виджетом, на которую ссылается статус в случае,
   * когда включена автоматическая трансляция в статус.
   * на котором отображается кнопка.
   * @type {string}
   */
  this.pageUrl = '';

  /**
   * Нормальный или минималистичный тип виджета.
   * @type {napp.ui.vk.Comments.Size}
   */
  this.size = napp.ui.vk.Comments.Size.AUTO;

  /**
   * Ширина блока в пикселах
   * Должно быть больше 300
   * @type {napp.ui.vk.Comments.Type}
   */
  this.width = 350;
};
goog.inherits(napp.ui.vk.Comments, npf.ui.Component);


/**
 * @enum {string}
 */
napp.ui.vk.Comments.Attach = {
  ALL: '*',
  AUDIO: 'audio',
  GRAFFITI: 'graffiti',
  LINK: 'link',
  PHOTO: 'photo',
  VIDEO: 'video'
};

/**
 * @enum {string}
 */
napp.ui.vk.Comments.Size = {
  AUTO: 'auto',
  MINI: 'mini',
  NORMAL: 'normal'
};


/** @inheritDoc */
napp.ui.vk.Comments.prototype.createDom = function() {
  napp.ui.vk.Comments.base(this, 'createDom');

  /** @type {Element} */
  var element = this.getElement();
  element.id = this.getId();
};

/** @inheritDoc */
napp.ui.vk.Comments.prototype.enterDocument = function() {
  napp.ui.vk.Comments.base(this, 'enterDocument');

  if (!this.inited_) {
    this.inited_ = true;

    var attrs = {
      'width': this.width,
      'limit': this.limit,
      'autoPublish': this.autoPublish ? 1 : 0,
      'height': this.height,
      'norealtime': this.noRealTime ? 1 : 0
    };

    /** @type {Array.<napp.ui.vk.Comments.Attach>} */
    var attach;

    if (goog.isArray(this.attach)) {
      attach = this.attach;
    } else {
      attach = [this.attach];
    }

    if (attach.length) {
      attrs['attach'] = attach.join(',');
    }

    if (napp.ui.vk.Comments.Size.NORMAL == this.size) {
      attrs['mini'] = 0;
    } else if (napp.ui.vk.Comments.Size.MINI == this.size) {
      attrs['mini'] = 1;
    } else {
      attrs['mini'] = 'auto';
    }

    if (this.pageUrl) {
      attrs['pageUrl'] = this.pageUrl;
    }

    this.getDomHelper().getWindow()['VK']['Widgets']['Comments'](
      this.getId(), attrs, this.pageId);
  }
};
