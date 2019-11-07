import { LitElement, customElement, html, css } from 'lit-element';
import { displayFlex, selfCenter, vertical } from '@collaborne/lit-flexbox-literals';
import { CSTBannerSingleton } from '../cst-banner/cst-banner';

@customElement('car-list')
export default class CarListElement extends LitElement {
  static styles = css`
    :host {
      ${displayFlex}
      ${vertical}
    }

    h1 {
      ${displayFlex}
      ${selfCenter}
    }
  `;

  firstUpdated() {
    setTimeout(() => {
      CSTBannerSingleton.show('Welcome!', 'Thanks for trying out the car service tracker. We use cookies!', 'Thanks!', '');
    }, 500);
  }

  render() {
    return html`
      <h1>Car List</h1>
    `;
  }
}
