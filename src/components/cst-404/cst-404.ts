import { LitElement, html, customElement, css } from 'lit-element';
import { displayFlex, vertical, centerAligned } from '@collaborne/lit-flexbox-literals';
import '@amber-ds/components/button';
import { NavigateEvent } from '../../events';

@customElement('cst-404')
export default class CST404 extends LitElement {
  static styles = css`
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
      <link href="https://unpkg.com/@amber-ds/visual@1.0.1/dist/index.css" rel="stylesheet" />

      <img src="images/undraw_vehicle_sale.svg" />
      <h1>OOPS!</h1>
      <p>
        These aren't the cars you are looking for..
      </p>
      <amber-button
        priority="secondary"
        @click=${() => {
          this.dispatchEvent(new NavigateEvent('/'));
        }}
      >
        <amber-button-contents>
          Let's get out of here
        </amber-button-contents>
      </amber-button>
    `;
  }
}
