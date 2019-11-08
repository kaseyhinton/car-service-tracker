import { LitElement, customElement, html, css } from 'lit-element';
import { CSTSnackbarSingleton } from '../cst-snackbar/cst-snackbar';
import CSTStyles from '../../styles/cst-styles/cst-styles';
import { plus } from '../../icons';

let firstLoad: boolean = false;

@customElement('cst-list')
export default class CSTListElement extends LitElement {
  static styles = css`
    ${CSTStyles}
    :host {
      display: flex;
      flex-direction: column;
      margin: 24px 16px;
    }

    img {
      margin-top: 24px;
      height: 132px;
    }

    header {
      display: flex;
      align-items: center;
      margin-bottom: 24px;
    }

    h4 {
      margin: 0;
    }

    a.button {
      align-self: flex-end;
      height: 32px;
      line-height: 32px;
      margin: 0 0 0 16px;
      padding: 0;
    }

    svg {
      width: 32px;
      height: 32px;
      fill: var(--app-primary-color);
    }
  `;

  firstUpdated() {
    if (!firstLoad) {
      firstLoad = true;
      CSTSnackbarSingleton.open('Thanks for trying our car service tracker.');
    }
  }

  render() {
    return html`
      <header>
        <h4 class="title">Vehicle Inventory</h4>
        <a class="button button-outline" href="/add-vehicle" alt="Add Vehicle" title="Add Vehicle">
          <svg viewBox="0 0 24 24">
            <path d=${plus} />
          </svg>
        </a>
      </header>
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
