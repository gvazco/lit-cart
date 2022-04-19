import { LitElement } from "lit";

export class GetData extends LitElement {
  static get properties() {
    return {
      url: { type: String },
      method: { type: String },
      cart: { type: Array },
    };
  }

  constructor() {
    super();

    this.cart = [];
  }

  connectedCallback() {
    this.getProductsDb();
  }

  _sendData(data) {
    this.dispatchEvent(
      new CustomEvent("ApiData", {
        detail: { data },
        bubbles: true,
        composed: true,
      })
    );
  }

  getProductsDb() {
    fetch(this.url, { method: this.method })
      .then((response) => {
        if (response.ok) return response.json();
        return Promise.reject(response);
      })
      .then((data) => {
        this._sendData(data);
      })

      .catch((error) => {
        console.warn("Something went wrong", error);
      });
  }
}
customElements.define("get-data", GetData);
