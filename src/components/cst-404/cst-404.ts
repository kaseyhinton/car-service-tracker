import { LitElement, html, customElement, css } from 'lit-element';
import CSTStyles from '../../styles/cst-styles/cst-styles';

@customElement('cst-404')
export default class CST404 extends LitElement {
  static styles = css`
    ${CSTStyles} :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 16px 0;
    }

    img {
      width: 248px;
      height: 248px;
    }

    small {
      margin-bottom: 2rem;
    }
  `;

  render() {
    return html`
      <img alt="car" src="images/undraw_vehicle_sale.svg" />
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
