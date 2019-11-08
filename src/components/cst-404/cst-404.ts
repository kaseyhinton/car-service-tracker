import { LitElement, html, customElement, css } from 'lit-element';
import { displayFlex, vertical, centerAligned } from '@collaborne/lit-flexbox-literals';
import CSTStyles from '../../styles/cst-styles/cst-styles';

@customElement('cst-404')
export default class CST404 extends LitElement {
  static styles = css`
  ${CSTStyles}
    :host {
      ${displayFlex}
      ${vertical}
      ${centerAligned}
      margin: 16px 0;
    }

    img {
      width: 248px;
      height: 248px;
    }
  `;
  render() {
    return html`
      <img alt="car" src="images/undraw_vehicle_sale.svg" />
      <h2>OOPS!</h2>
      <p>
        These aren't the cars you are looking for..
      </p>
      <a class="button" href="/">
        Let's get out of here
      </a>
    `;
  }
}
