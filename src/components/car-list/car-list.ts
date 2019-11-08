import { LitElement, customElement, html, css } from 'lit-element';
import { displayFlex, vertical } from '@collaborne/lit-flexbox-literals';
import { CSTBannerSingleton } from '../cst-banner/cst-banner';
import CSTStyles from '../cst-styles/cst-styles';

let firstLoad: boolean = false;

@customElement('car-list')
export default class CarListElement extends LitElement {
  static styles = css`
    ${CSTStyles}
    :host {
      ${displayFlex}
      ${vertical}
      margin: 24px 16px;
    }

    img {
      margin-top: 24px;
      height: 132px;
    }
  `;

  firstUpdated() {
    if (!firstLoad) {
      firstLoad = true;
      CSTBannerSingleton.open('We appreciate you trying our car service tracker.');
    }
  }

  render() {
    return html`
      <h3 class="title">Vehicle Inventory</h3>

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

      <img alt="car" src="images/undraw_fast_car.svg" />
    `;
  }
}
