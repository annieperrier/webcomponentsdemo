'use strict';

class FixIt extends HTMLElement {
  // the root shadow dom
  #root;

  // attribute: mode (basic | advanced)
  #mode;
  // attribute: the initial value to set the counter
  #initialCount;

  // the current count
  #fixCount;

  // the button element
  #bElem;
  // the status text element
  #pElem;

  constructor() {
    // Always call super first in constructor
    super();

    this.#processAttributes();
    
    this.#initialize();

    // Create a shadow root
    this.#root = this.attachShadow({mode: 'open'});

    const containerElem = document.createElement('div');

    const cssElem = this.#createCssElement();
    containerElem.appendChild(cssElem);

    const bElem = this.#createButtonElement();
    containerElem.appendChild(bElem);
  
    this.#createStatusElement();
    containerElem.appendChild(this.#pElem);

    // Append container to the shadow root
    this.#root.appendChild(containerElem);
  }

  // Specify observed attributes so that
  // attributeChangedCallback will work
  static get observedAttributes() {
    return ['mode'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name == 'mode') {
      if (oldValue != newValue) {
        this.#mode = this.#parseMode(newValue);
        this.#setModeClass();
      }
    }
  }

  #processAttributes() {
    this.#mode = this.#parseMode(this.getAttribute('mode'));
    this.#initialCount = this.#parseInitialCount(this.getAttribute('initial-count'));
  }

  #parseMode(mode) {
    switch(mode) {
      case 'advanced':
      case 'basic':
        return mode;
      default:
        return 'basic';
    }
  }

  #parseInitialCount(count) {
    let res = parseInt(count);
    if (res > 0)
      return res;
    return 0;
  }

  #initialize() {
    this.#fixCount = this.#initialCount;
  }

  #createCssElement() {
    const cssElem = document.createElement('link');
    cssElem.setAttribute('rel', 'stylesheet');
    // TODO easier css path
    cssElem.setAttribute('href', 'components/fixit/fixit.css');
    return cssElem;
  }

  #createButtonElement() {
    const bConElem = document.createElement('div');
    bConElem.setAttribute('class', 'reallybig-container');
    this.#bElem = document.createElement('button');
    this.#bElem.innerText = 'Fix It!';
    this.#bElem.setAttribute('class', 'reallybig');
    this.#setModeClass();
    this.#bElem.onclick = (ev) => {
      this.#increaseFixCount();
      this.#render();
    }
    bConElem.appendChild(this.#bElem);
    return bConElem;
  }

  #setModeClass() {
    // remove any current mode class
    this.#bElem.classList.remove('mode-basic');
    this.#bElem.classList.remove('mode-advanced');
    this.#bElem.classList.add('mode-' + this.#mode);
  }

  #createStatusElement() {
    this.#pElem = document.createElement('p');
    this.#updateStatusText();
  }

  #increaseFixCount() {
    this.#fixCount++;
  }

  #render() {
    this.#updateStatusText();
  }

  #updateStatusText() {
    let times = 'times';
    if (this.#fixCount == 1)
      times = 'time'
    this.#pElem.textContent = `Fixed ${this.#fixCount} ${times}`;
  }

  // public getter to obtain the current fixCount
  get fixCount() {
    return this.#fixCount;
  }
}

window.customElements.define('fix-it', FixIt);