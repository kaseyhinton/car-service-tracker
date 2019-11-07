import { LitElement, customElement, html, css } from 'lit-element';
import { displayFlex, selfCenter, vertical } from '@collaborne/lit-flexbox-literals';

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
  render() {
    return html`
      <h1>Car List</h1>
    `;
  }
}
