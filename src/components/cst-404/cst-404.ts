import { LitElement, html, customElement, css } from 'lit-element';
import CSTStyles from '../../styles/cst-styles/cst-styles';
import '@power-elements/lazy-image';

@customElement('cst-404')
export default class CST404 extends LitElement {
  static styles = css`
    ${CSTStyles} :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 16px 0;
    }

    small {
      margin-bottom: 2rem;
    }

    lazy-image {
      width: 150px;
      height: 100px;
    }
  `;

  render() {
    return html`
      <lazy-image alt="car" src="images/undraw_vehicle_sale.svg"></lazy-image>
      <h1>OOPS!</h1>
      <small>
        You've come to the wrong spot!
      </small>
      <a class="button" href="/">
        Home
      </a>
    `;
  }
}
