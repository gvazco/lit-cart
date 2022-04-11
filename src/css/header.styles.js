import { css } from "lit";

export default css`
  /* ------------------------------ Component Navbar ----------------------------- */
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    background-color: #343a41;
  }

  ul.navbar-nav {
    margin-bottom: 12px;
  }

  .navbar .logo {
    width: 50px;
    padding: 10px;
    cursor: pointer;
    animation: app-logo-spin infinite 20s linear;
  }

  .logo img {
    max-width: 50px;
  }

  a.nav-link {
    color: #fff;
    margin: 0 15px;
    text-transform: uppercase;
    text-decoration: none;
  }

  a.nav-link:hover {
    color: #ffff00;
  }

  .nav-link {
    display: block;
    padding: 0.5rem 1rem;
  }

  .navbar .cart {
    background-color: transparent;
    border: 0;
  }

  .navbar .cart img {
    width: 30px;
    cursor: pointer;
  }

  .cart-container {
    position: relative;
    border-radius: 3px;
  }

  .cart-products {
    position: absolute;
    top: 52px;
    right: 0;
    background-color: #fff;
    width: 300px;
    max-height: 400px;
    height: 0;
    overflow: scroll;
    border-radius: 3px;
  }

  .cart-products.active {
    height: auto;
    padding: 10px;
    background: #ffffff;
    box-shadow: 2px 2px 3px #b4b8b8, -2px -2px 3px #ffffff;
    border: 0;
    border-radius: 3px;
  }

  .cart-product {
    position: relative;
    display: flex;
    align-items: center;
    padding: 10px;
  }
  .cart-product.empty {
    justify-content: center;
  }

  .cart-product img {
    width: 100px;
  }

  .cart-product-info {
    width: 100%;
  }

  .cart-product-delete {
    text-align: right;
  }

  .cart-product-delete button {
    color: #f00;
    background-color: transparent;
    border: 0;
    margin-top: 10px;
    cursor: pointer;
  }

  .cart-product-delete button:hover {
    padding-left: 10px;
  }

  .cart-product-info p {
    margin: 0;
  }

  .cart-product-info .quantity {
    position: absolute;
    top: 0px;
    left: 12px;
    background-color: #ffff00;
    color: #000;
    padding: 0px 5px;
    border-radius: 1px;
  }

  .change-quantity {
    text-align: right;
  }

  .change-quantity button {
    padding: 0 9px;
    margin: 2px;
    border-radius: 24px;
    background: #ffffff;
    box-shadow: 4px 4px 7px #b4b8b8, -4px -4px 8px #ffffff;
    border: 0;
    cursor: pointer;
  }

  .change-quantity button:hover {
    padding: 0 9px;
    border-radius: 24px;
    background: #ffffff;
    box-shadow: inset 3px 3px 6px #b8b8b8, inset -3px -3px 6px #ffffff;
  }

  @keyframes app-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* -------------------------------- Bootstrap ------------------------------- */

  .container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }

  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    background-color: #343a41;
  }

  .navbar > .container {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }

  .navbar-nav {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
  }

  @media (min-width: 1200px) {
    .container {
      max-width: 1140px !important;
    }
  }

  @media (min-width: 992px) {
    .container {
      max-width: 960px;
    }

    .navbar > .container {
      -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
    }

    .navbar-collapse {
      display: -webkit-box !important;
      display: -ms-flexbox !important;
      display: flex !important;
      -ms-flex-preferred-size: auto;
      flex-basis: auto;
    }

    .navbar-nav {
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -ms-flex-direction: row;
      flex-direction: row;
    }

    .nav-link {
      padding-right: 0.5rem;
      padding-left: 0.5rem;
    }
  }

  .mr-auto {
    margin-right: auto !important;
  }

  .navbar-collapse {
    -ms-flex-preferred-size: 100%;
    flex-basis: 100%;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .collapse {
    display: none;
  }
`;
