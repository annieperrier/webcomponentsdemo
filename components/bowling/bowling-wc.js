'use strict';

class BowlingWC extends HTMLElement {
  #root;

  constructor() {
    super();
  }
  connectedCallback() {
    // Create a shadow root
    this.#root = this.attachShadow({mode: 'open'});

    const input = document.createElement('input');
    input.setAttribute('id', 'playerName');
    const label = document.createElement('label');
    label.setAttribute('for', 'playerName');
    label.innerHTML = 'Player name: ';

    const button = document.createElement('button');
    button.innerHTML = "Start game";
    button.onclick = (event) => {
      const inputEl = this.#root.getElementById('playerName');
      const username = inputEl.value;
      const welcomeEl = this.#root.getElementById('welcomeHeader');
      welcomeEl.innerHTML = "Welcome: " + username;

      for (let i = 0; i <10; i++) {
        const square = this.#buildTurnSquare(i);
        scoreSheet.appendChild(square);
      }

    };
    const scoreSheet = document.createElement('div');

    const cssElem = this.#createCssElement();

    const welcomeHeader = document.createElement('h2');
    welcomeHeader.setAttribute('id', "welcomeHeader");

    // Append container to the shadow root
    this.#root.appendChild(cssElem);
    this.#root.appendChild(label);
    this.#root.appendChild(input);
    this.#root.appendChild(button);
    this.#root.appendChild(welcomeHeader);
    this.#root.appendChild(scoreSheet);
  }

  #createCssElement() {
    const cssElem = document.createElement('link');
    cssElem.setAttribute('rel', 'stylesheet');
    cssElem.setAttribute('href', 'bowling-wc.css');
    return cssElem;
  }

  /**
   * Build a single turn square.
   * @param {number} index 
   * @returns DOM element for the single turn square
   */
  #buildTurnSquare(index) {
    const container = document.createElement('div');
    container.classList.add("scoreContainer");

    for (let i = 0; i <3; i++) {
      const throwInput = document.createElement('input');
      throwInput.setAttribute('id', 'frame-'+index+'-throw-'+i);
      container.appendChild(throwInput);
    }
    const totalScore = document.createElement('div');
    totalScore.classList.add("total");

    container.appendChild(totalScore);
    return container;
  }
}

customElements.define("bowling-wc", BowlingWC);