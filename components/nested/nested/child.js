'use strict';

class ChildWC extends HTMLElement {
  #root;
  #observer;

  constructor() {
    super();
  }

  connectedCallback() {
    // Create a shadow root
    this.#root = this.attachShadow({mode: 'open'});

    const container = document.createElement('div');
    container.classList.add('child-container');

    const cssElem = this.#createCssElement();
    container.appendChild(cssElem);

    const index = document.createElement('div');
    index.classList.add('index');
    index.innerText = "N/A";
    container.appendChild(index);

    const badges = document.createElement('div');
    badges.classList.add('badges');
    container.appendChild(badges);

    // Append container to the shadow root
    this.#root.appendChild(container);

    this.#setupObserverIndex();
  }

  disconnectedCallback() {
    this.#observer.disconnect();
  }

  /**
   * Watch for changes to data-index and update our display if changed.
   */
  #setupObserverIndex() {
    // Select the node that will be observed for mutations
    const targetNode = this;

    // Options for the observer (which mutations to observe)
    const config = { attributes: true };

    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === "attributes") {
          if (mutation.attributeName == 'data-index') {
            const indexEl = targetNode.#root.querySelector(".index");
            indexEl.innerText = this.dataset.index ?? "";
          }
        }
      }
    };

    // Create an observer instance linked to the callback function
    this.#observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    this.#observer.observe(targetNode, config);
  }

  #createCssElement() {
    const cssElem = document.createElement('link');
    cssElem.setAttribute('rel', 'stylesheet');
    // TODO easier css path
    cssElem.setAttribute('href', 'nested/child.css');
    return cssElem;
  }
}

customElements.define("child-wc", ChildWC);