'use strict';

class ParentWC extends HTMLElement {
  #root;

  constructor() {
    super();
  }

  connectedCallback() {
    // Create a shadow root
    this.#root = this.attachShadow({mode: 'open'});

    const container = document.createElement('div');
    container.classList.add('parent-container');
  
    const cssElem = this.#createCssElement();
    container.appendChild(cssElem);

    // create "template" with a slot and add a copy of it to our container
    const containerTemplate = document.createElement("template");
    containerTemplate.innerHTML = `
       <slot></slot>
    `;
    container.appendChild(containerTemplate.content.cloneNode(true));

    // need to wait until next cycle to access slot elements
    setTimeout(() => this.#setIndexes(), 100);
    setTimeout(() => this.#addBadges(), 100);

    // Append container to the shadow root
    this.#root.appendChild(container);
  }

  #createCssElement() {
    const cssElem = document.createElement('link');
    cssElem.setAttribute('rel', 'stylesheet');
    // TODO easier css path
    cssElem.setAttribute('href', 'nested/parent.css');
    return cssElem;
  }

  /**
   * Set the `data-index` attribute on the wc-child. It can watch for changes to it.
   */
  #setIndexes() {
    this.#root.querySelector("slot").assignedElements().forEach((child, index) => {
      child.setAttribute('data-index', index);
    });
  }

  /**
   * Add a badge element to the first and last child.
   */
  #addBadges() {
    const slots = this.#root.querySelector("slot").assignedElements();
    let lastChild;
    slots.forEach((child, index) => {
      const childContainer = child.shadowRoot.querySelector(".child-container .badges");
      if (index == 0) {
        const badge = document.createElement("div");
        badge.innerText = 'First';
        badge.classList.add("badge");
        childContainer.appendChild(badge);
      }
      lastChild = child;
    });
    const lastChildContainer = lastChild.shadowRoot.querySelector(".child-container .badges");
    const badge = document.createElement("div");
    badge.classList.add("badge");
    badge.innerText = 'Last';
    lastChildContainer.appendChild(badge);
  }
}

customElements.define("parent-wc", ParentWC);