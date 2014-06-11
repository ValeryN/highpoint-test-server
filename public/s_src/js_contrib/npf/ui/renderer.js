goog.provide('npf.ui.Renderer');

goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.dom.classlist');


/**
 * @constructor
 */
npf.ui.Renderer = function() {

};
goog.addSingletonGetter(npf.ui.Renderer);


/**
 * Constructs a new renderer and sets the CSS class that the renderer will use
 * as the base CSS class to apply to all elements rendered by that renderer.
 * An example to use this function using a color palette:
 *
 * @param {function(new: OBJECT, ...)} ctor The constructor of the
 *    renderer you are trying to create.
 * @param {string} cssClassName The name of the CSS class for this renderer.
 * @return {!OBJECT} An instance of the desired renderer with its getCssClass()
 *   method overridden to return the supplied custom CSS class name.
 * @template OBJECT
 */
npf.ui.Renderer.getCustomRenderer = function(ctor, cssClassName) {
  var renderer = new ctor();

  /**
   * Returns the CSS class to be applied to the root element of components
   * rendered using this renderer.
   * @return {string} Renderer-specific CSS class.
   */
  renderer.getCssClass = function() {
    return cssClassName;
  };

  return renderer;
};

/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
npf.ui.Renderer.CSS_CLASS = goog.getCssName('npf-component');

/**
 * @param {!npf.ui.RenderedComponent} component
 * @return {Element}
 */
npf.ui.Renderer.prototype.createDom = function(component) {
  /** @type {!Element} */
  var element = component.getDomHelper().createDom(goog.dom.TagName.DIV,
    this.getClassNames(component).join(' '));

  return element;
};

/**
 * @param {npf.ui.RenderedComponent} component
 * @param {Element} element
 * @protected
 */
npf.ui.Renderer.prototype.applyClassNames = function(component, element) {
  goog.dom.classlist.addAll(element, this.getClassNames(component));
};

/**
 * Takes the component's root element and returns the parent element of the
 * component's contents.  Since by default components are rendered as a single
 * DIV, the default implementation returns the element itself.  Subclasses
 * with more complex DOM structures must override this method as needed.
 * @param {Element} element Root element of the component whose content element
 *                          is to be returned.
 * @return {Element} The component's content element.
 */
npf.ui.Renderer.prototype.getContentElement = function(element) {
  return element;
};

/**
 * Updates the component's DOM by adding or removing the specified class name
 * to/from its root element. Because of this, subclasses should use this method
 * when modifying class names on the component's root element.
 * @param {npf.ui.RenderedComponent|Element} component Component instance
 *                                           (or root element) to be updated.
 * @param {string} className CSS class name to add or remove.
 * @param {boolean} enable Whether to add or remove the class name.
 */
npf.ui.Renderer.prototype.enableClassName = function(component, className,
    enable) {
  var element = /** @type {Element} */ (component.getElement ?
    component.getElement() : component);

  if (element) {
    goog.dom.classlist.enable(element, className, enable);
  }
};


/**
 * Updates the component's DOM by adding or removing the specified extra class
 * name to/from its element.
 * @param {npf.ui.RenderedComponent} component
 * @param {string} className CSS class name to add or remove.
 * @param {boolean} enable Whether to add or remove the class name.
 */
npf.ui.Renderer.prototype.enableExtraClassName = function(component, className,
    enable) {
  // The base class implementation is trivial;
  // subclasses should override as needed.
  this.enableClassName(component, className, enable);
};

/**
 * Returns true if this renderer can decorate the element, false otherwise.
 * The default implementation always returns true.
 * @param {Element} element Element to decorate.
 * @return {boolean} Whether the renderer can decorate the element.
 */
npf.ui.Renderer.prototype.canDecorate = function(element) {
  return true;
};

/**
 * Default implementation of {@code decorate}
 * for {@link npf.ui.RenderedComponent}s.
 * Initializes the component's ID, content, and state based on the ID of the
 * element, its child nodes, and its CSS classes, respectively. Returns the
 * element.
 * @param {!npf.ui.RenderedComponent} component Component instance to decorate
 *                                              the element.
 * @param {Element} element Element to decorate.
 * @return {Element} Decorated element.
 */
npf.ui.Renderer.prototype.decorate = function(component, element) {
  // Set the component's ID to the decorated element's DOM ID, if any.
  if (element.id) {
    component.setId(element.id);
  }

  // Initialize the component's state based on the decorated element's CSS class.
  // This implementation is optimized to minimize object allocations, string
  // comparisons, and DOM access.
  var rendererClassName = this.getCssClass();
  var structuralClassName = this.getStructuralCssClass();
  var hasRendererClassName = false;
  var hasStructuralClassName = false;
  var hasCombinedClassName = false;
  var classNames = /** @type {!Array.<string>} */ (
    goog.dom.classlist.get(element));
  var extraClassNames = component.getExtraClassNames();

  goog.array.forEach(classNames, function(className) {
    if (!hasRendererClassName && className == rendererClassName) {
      hasRendererClassName = true;

      if (structuralClassName == rendererClassName) {
        hasStructuralClassName = true;
      }
    } else if (!hasStructuralClassName && className == structuralClassName) {
      hasStructuralClassName = true;
    }
  }, this);

  // Make sure the element has the renderer's CSS classes applied, as well as
  // any extra class names set on the component.
  if (!hasRendererClassName) {
    classNames.push(rendererClassName);

    if (structuralClassName == rendererClassName) {
      hasStructuralClassName = true;
    }
  }

  if (!hasStructuralClassName) {
    classNames.push(structuralClassName);
  }

  if (extraClassNames) {
    classNames.push.apply(classNames, extraClassNames);
  }

  // Only write to the DOM if new class names had to be added to the element.
  if (
    !hasRendererClassName || !hasStructuralClassName ||
    extraClassNames || hasCombinedClassName
  ) {
    goog.dom.classlist.addAll(element, classNames);
  }

  return element;
};

/**
 * @param {string} className
 * @param {Element} element
 * @return {Element}
 */
npf.ui.Renderer.prototype.getElementByClass = function(className, element) {
  if (element) {
    return goog.dom.getElementByClass(className, element);
  }

  return null;
};

/**
 * @param {string} className
 * @param {Element} element
 * @return {{length:number}?}
 */
npf.ui.Renderer.prototype.getElementsByClass = function(className, element) {
  if (element) {
    return goog.dom.getElementsByClass(className, element);
  }

  return null;
};

/**
 * Returns the CSS class name to be applied to the root element of all
 * components rendered or decorated using this renderer.  The class name
 * is expected to uniquely identify the renderer class, i.e. no two
 * renderer classes are expected to share the same CSS class name.
 * @return {string} Renderer-specific CSS class name.
 */
npf.ui.Renderer.prototype.getCssClass = function() {
  return npf.ui.Renderer.CSS_CLASS;
};

/**
 * Returns the name of a DOM structure-specific CSS class to be applied to the
 * root element of all components rendered or decorated using this renderer.
 * Unlike the class name returned by {@link #getCssClass}, the structural class
 * name may be shared among different renderers that generate similar DOM
 * structures.  The structural class name also serves as the basis of derived
 * class names used to identify and style structural elements of the component's
 * DOM, as well as the basis for state-specific class names.  The default
 * implementation returns the same class name as {@link #getCssClass}, but
 * subclasses are expected to override this method as needed.
 * @return {string} DOM structure-specific CSS class name (same as the renderer-
 *     specific CSS class name by default).
 */
npf.ui.Renderer.prototype.getStructuralCssClass = function() {
  return this.getCssClass();
};

/**
 * Returns all CSS class names applicable to the given component, based on its
 * state.  The return value is an array of strings containing
 * <ol>
 *   <li>the renderer-specific CSS class returned by {@link #getCssClass},
 *       followed by
 *   <li>the structural CSS class returned by {@link getStructuralCssClass} (if
 *       different from the renderer-specific CSS class), followed by
 *   <li>any extra classes returned by the component's {@code getExtraClassNames}
 *       method and
 * </ol>
 * Since all components have at least one renderer-specific CSS class name, this
 * method is guaranteed to return an array of at least one element.
 * @param {npf.ui.RenderedComponent} component Component whose CSS classes are
 *                                           to be returned.
 * @return {Array.<string>} Array of CSS class names applicable to the component.
 * @protected
 */
npf.ui.Renderer.prototype.getClassNames = function(component) {
  var cssClass = this.getCssClass();
  // Start with the renderer-specific class name.
  var classNames = [cssClass];
  // Add structural class name, if different.
  var structuralCssClass = this.getStructuralCssClass();

  if (structuralCssClass != cssClass) {
    classNames.push(structuralCssClass);
  }

  // Add extra class names, if any.
  var extraClassNames = component.getExtraClassNames();

  if (extraClassNames) {
    classNames.push.apply(classNames, extraClassNames);
  }

  return classNames;
};
