import { LitElement, html, css } from "lit";

import "./Components/GetData";
import styleHeader from "./css/header.styles";
import style from "./css/global.styles";

const logo = new URL("../assets/open-wc-logo.svg", import.meta.url).href;

const cart = new URL("../assets/img/cart.png", import.meta.url).href;

export class LitCart extends LitElement {
  static get properties() {
    return {
      prod: { type: Array },
      cart: { type: Array },
      strHtml: { type: Array },
      localStorageItems: { type: Array },
    };
  }

  static get styles() {
    return [style, styleHeader];
  }

  constructor() {
    super();
    this.prod = [];
    this.localStorageItems = [];
    this.cart = "cartProductsId";
    this.strHtml = [];
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

  _addProductCart(event) {
    const idProduct = event.path[3].accessKey;

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

    this.localStorageItems = window.localStorage.cartProductsId;
    this.requestUpdate();
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

  _deleteProductCart(event) {
    const idProduct = event.composedPath()[3].accessKey;
    const idProductCart = localStorage.getItem(this.cart);
    const arrIdProductsCart = idProductCart.split(",");
    const resultIdDelete = this.deleteAllIds(idProduct, arrIdProductsCart);

    if (resultIdDelete) {
      let count = 0;
      let idsString = "";

      resultIdDelete.forEach((id) => {
        count++;
        if (count < resultIdDelete.length) {
          idsString += id + ",";
        } else {
          idsString += id;
        }
      });
      localStorage.setItem(this.cart, idsString);
    }

    const idsLocalStorage = localStorage.getItem(this.cart);
    if (!idsLocalStorage) {
      localStorage.removeItem(this.cart);
    }

    this.requestUpdate();
  }

  _increaseQuantity(event) {
    const idProduct = event.composedPath()[3].accessKey;
    const idProductsCart = localStorage.getItem(this.cart);
    const arrIdProductsCart = idProductsCart.split(",");
    arrIdProductsCart.push(idProduct);

    let count = 0;
    let idsString = "";

    arrIdProductsCart.forEach((id) => {
      count++;
      if (count < arrIdProductsCart.length) {
        idsString += id + ",";
      } else {
        idsString += id;
      }
    });
    localStorage.setItem(this.cart, idsString);

    this.requestUpdate();
  }

  _decreaseQuantity(event) {
    const idProduct = event.composedPath()[3].accessKey;
    const idProductsCart = localStorage.getItem(this.cart);
    const arrIdProductsCart = idProductsCart.split(",");
    const deleteItem = idProduct.toString();
    let index = arrIdProductsCart.indexOf(deleteItem);
    if (index > -1) {
      arrIdProductsCart.splice(index, 1);
    }
    let count = 0;
    let idsString = "";

    arrIdProductsCart.forEach((id) => {
      count++;

      if (count < arrIdProductsCart.length) {
        idsString += id + ",";
      } else {
        idsString += id;
      }
    });

    localStorage.setItem(this.cart, idsString);

    this.requestUpdate();
  }

  render() {
    return html`
      <get-data url="../dbProducts.json" method="GET"></get-data>
      <div>${this.headerTemplate}</div>
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

  get headerTemplate() {
    const products = this.prod;
    // Convertimos el resultado del localStorage en un array
    const localStorageItems = localStorage.getItem(this.cart);

    if (!localStorageItems) {
      this.strHtml = html`
        <div class="cart-product empty">
          <p><b>Ooops!</b> No hay productos en su carrito.</p>
        </div>
      `;
    } else {
      const idProductsSplit = localStorageItems.split(",");

      // Eliminamos los ID's duplicados
      const idProductsCart = Array.from(new Set(idProductsSplit));

      let obj = [];

      idProductsCart.forEach((id) => {
        products.forEach((product) => {
          if (id == product.id) {
            // Cuantificamos duplicados
            const quantity = this.countDuplicatesId(id, idProductsSplit);
            // Contabilizamos precios
            const totalPrice = product.price * quantity;

            obj.push(product);

            this.strHtml = obj.map(
              (product) => html`<div
                class="cart-product"
                accesskey=${product.id}
              >
                <img src="${product.image}" alt="${product.name}" />
                <div class="cart-product-info">
                  <span class="quantity">${quantity}</span>

                  <p>${product.name}</p>
                  <p>$ ${totalPrice.toFixed(2)}</p>
                  <p class="change-quantity">
                    <button @click="${this._decreaseQuantity}">-</button>
                    <button @click="${this._increaseQuantity}">+</button>
                  </p>
                  <p class="cart-product-delete">
                    <button @click="${this._deleteProductCart}">
                      Eliminar
                    </button>
                  </p>
                </div>
              </div>`
            );
          }
        });
      });
    }

    return html`
      <nav class="navbar">
        <div class="containerNav">
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
                ${this.strHtml}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    `;
  }

  countDuplicatesId(value, arrIds) {
    let count = 0;

    arrIds.forEach((id) => {
      if (value == id) {
        count++;
      }
    });

    return count;
  }

  deleteAllIds(id, arrIds) {
    return arrIds.filter((itemId) => {
      return itemId != id;
    });
  }

  /* -------------------------------------------------------------------------- */
}
