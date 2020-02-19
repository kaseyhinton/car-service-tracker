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
      width: var(--lazy-image-width);
      height: var(--lazy-image-height);
      background-color: #fff;
      --lazy-image-fade-duration: 0.6s;
    }

    lazy-placeholder {
      background: #f5f5f5;
      width: var(--lazy-image-width);
      height: var(--lazy-image-height);
      border-radius: 8px;
    }
  `;

  render() {
    return html`
      <lazy-image fade alt="car" src="images/undraw_vehicle_sale.svg">
        <lazy-placeholder slot="placeholder"></lazy-placeholder>
      </lazy-image>
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
