import { LitElement, html, css } from "lit";

import "./Components/AppHeader";
import "./Components/GetData";

import style from "./css/global.styles";

export class LitCart extends LitElement {
  static get properties() {
    return {
      prod: { type: Array },
      cart: { type: Array },
    };
  }

  static get styles() {
    return [style];
  }

  constructor() {
    super();

    this.prod = [];

    this.cart = [];

    this.addEventListener("ApiData", (e) => {
      this._dataFormat(e.detail.data);
    });
  }

  _dataFormat(data) {
    let products = [];

    data.forEach((product) => {
      products.push({
        id: product.id,
        name: product.name,
        image: product.image,
        extraInfo: product.extraInfo,
        price: product.price,
      });
    });

    this.prod = products;
  }

  _addProductCart(e) {
    const idProduct = e.path[3].accessKey;

    let arrProductsId = [];

    let localStorageItems = localStorage.getItem(this.cart);

    if (localStorageItems === null) {
      arrProductsId.push(idProduct);
      localStorage.setItem(this.cart, arrProductsId);
    } else {
      let productsId = localStorage.getItem(this.cart);
      if (productsId.length > 0) {
        productsId += "," + idProduct;
      } else {
        productsId = idProduct;
      }
      localStorage.setItem(this.cart, productsId);
    }
  }

  render() {
    return html`
      <get-data url="../dbProducts.json" method="GET"></get-data>
      <app-header></app-header>
      <div class="container">
        <div class="wrapper">${this.dataTemplate}</div>
      </div>
    `;
  }

  get dataTemplate() {
    return html`
      ${this.prod.map(
        (product) => html`
          <div class="card" accesskey="${product.id}">
            <div class="card-content">
              <img
                src="${product.image}"
                class="card-img-top"
                alt="${product.name}"
              />
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.extraInfo}</p>
                <p class="card-text">$ ${product.price} MXN</p>
                <button
                  type="button"
                  class="btn btn-cart"
                  @click="${this._addProductCart}"
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        `
      )}
    `;
  }

  /* -------------------------------------------------------------------------- */
}
