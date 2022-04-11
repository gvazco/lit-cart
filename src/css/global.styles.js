import { css } from "lit";

export default css`
  /* --------------------------------- Global --------------------------------- */

  .btn:not(:disabled):not(.disabled) {
    cursor: pointer;
  }

  h5 {
    font-size: 1.25rem;
  }

  .btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  /* -------------------------------- products -------------------------------- */

  .btn-cart {
    background-color: transparent;
    color: #ffff00;
    border: 1px solid #ffff00;
    width: 100%;
    border-radius: 50px;
  }

  .btn-cart:hover {
    background-color: #ffff00;
    border: 1px solid #ffff00;
    color: #000;
  }

  .container {
    text-align: center;
    background-color: #343a41 !important;
    display: flex;
    margin: 100px auto;
    justify-content: center;
  }

  .wrapper {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 1.5em;
  }

  @media (min-width: 997px) {
    .container {
      max-width: 1140px !important;
    }
    .wrapper {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (max-width: 996px) {
    .wrapper {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 768px) {
    .wrapper {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .card {
    padding: 3%;
    text-align: center;
    border-radius: 24px;
    color: #ffff00;
    background: #343a41;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: 8px 8px 14px #252a2f, -8px -8px 14px #434a53;
  }

  .card-title {
    margin-bottom: 0.75rem;
  }

  .card:hover {
    border-radius: 24px;
    background: #343a41;
    box-shadow: inset 8px 8px 14px #252a2f, inset -8px -8px 14px #434a53;
  }

  .card img {
    width: 100%;

    border-radius: 24px;
    box-shadow: 8px 8px 14px #252a2f, -8px -8px 14px #434a53;
  }
`;
