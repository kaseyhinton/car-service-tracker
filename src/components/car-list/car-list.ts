import { LitElement, customElement, html, css } from 'lit-element';
import { displayFlex, vertical } from '@collaborne/lit-flexbox-literals';
import { CSTBannerSingleton } from '../cst-banner/cst-banner';

let firstLoad: boolean = false;

@customElement('car-list')
export default class CarListElement extends LitElement {
  static styles = css`
    :host {
      ${displayFlex}
      ${vertical}
      margin: 16px 0;
    }

    img {
      margin-top: 24px;
      height: 132px;
    }

    th {
      text-align: left;
    }

    tr:nth-child(2n) {
      background-color: #f9f9f9;
    }

    td:hover {
      cursor: default;
    }
  `;

  firstUpdated() {
    if (!firstLoad) {
      firstLoad = true;
      CSTBannerSingleton.show('Thanks!', 'We appreciate you trying our car service tracker.', 'Ok', '');
    }
  }

  render() {
    return html`
      <link href="https://unpkg.com/@amber-ds/visual@1.0.1/dist/index.css" rel="stylesheet" />
      <h2>Vehicle Inventory</h2>
      <table>
        <tr>
          <th>Make</th>
          <th>Model</th>
          <th>Year</th>
        </tr>
        <tr>
          <td>Mitsubishi</td>
          <td>Mighty Max</td>
          <td>1994</td>
        </tr>
        <tr>
          <td>Chevrolet</td>
          <td>Equinox</td>
          <td>2016</td>
        </tr>
        <tr>
          <td>Chevrolet</td>
          <td>Malibu</td>
          <td>2004</td>
        </tr>
        <tr>
          <td>Ford</td>
          <td>Expedition</td>
          <td>1998</td>
        </tr>
      </table>

      <img src="images/undraw_fast_car.svg" />
    `;
  }
}
