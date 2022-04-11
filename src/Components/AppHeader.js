import { LitElement, html, css } from "lit";

import style from "../css/header.styles";

const logo = new URL("../../assets/open-wc-logo.svg", import.meta.url).href;

const cart = new URL("../../assets/img/cart.png", import.meta.url).href;

export class AppHeader extends LitElement {
  static get styles() {
    return [style];
  }

  render() {
    return html`
      <nav class="navbar">
        <div class="container">
          <img class="logo" alt="open-wc logo" src=${logo} />

          <div class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="./">Lit-Element</a>
              </li>

              <li class="nav-item active">
                <a
                  class="nav-link"
                  target="_blank"
                  href="https://vanillateamtres.vercel.app/"
                  >Vanilla</a
                >
              </li>
            </ul>
            <div class="cart-container">
              <button
                class="btn btn-secondary cart"
                type="button"
                @click="${this._openCloseCart}"
              >
                <img class="" src="${cart}" alt="Carrito" />
              </button>
              <div id="cart-products" class="cart-products hidden">
                Este carrito esta vacio
              </div>
            </div>
          </div>
        </div>
      </nav>
    `;
  }

  _openCloseCart() {
    const containerCart = this.shadowRoot.querySelector("#cart-products");

    containerCart.classList.forEach((item) => {
      if (item == "hidden") {
        containerCart.classList.remove("hidden");
        containerCart.classList.add("active");
      }

      if (item === "active") {
        containerCart.classList.remove("active");
        containerCart.classList.add("hidden");
      }
    });
  }
}
customElements.define("app-header", AppHeader);
