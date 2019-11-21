import { LitElement, customElement, html, css, property } from 'lit-element';
import CSTStyles from '../../styles/cst-styles/cst-styles';
import { plusIcon, editIcon, deleteIcon } from '../../utilities/icons';
import { GET, DELETE } from '../../utilities/api';

import '../cst-loading/cst-loading';

@customElement('cst-list')
export default class CSTListElement extends LitElement {
  @property({ type: Array }) cars: Array<Car> = [];
  @property({ type: Object }) selectedCar: Car | null;
  @property({ type: Boolean }) isLoading: boolean = false;

  static styles = css`
    ${CSTStyles} :host {
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
      align-items: flex-end;
      margin-bottom: 24px;
    }

    h2 {
      display: flex;
    }

    tr {
      user-select: none;
      cursor: pointer;
    }

    tr[selected] {
      background: #eee;
      transition: 0.3s ease;
    }

    a.button {
      display: flex;
      margin-left: 16px;
      transition: 0.3s ease;
    }

    svg {
      align-self: center;
      width: 20px;
      height: 20px;
      fill: #fff;
      margin-left: 8px;
      transition: 0.3s ease;
    }

    a.button-outline svg {
      fill: var(--app-primary-color);
    }

    a.button-outline:hover svg {
      fill: var(--app-hover-color);
    }

    loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    loading-container small {
      margin-right: 16px;
    }

    [hidden] {
      display: none !important;
    }
  `;

  firstUpdated() {
    this._getCars();
  }

  private async _getCars() {
    this.isLoading = true;
    this.cars = [];
    this.cars = await GET('cars');
    console.log(this.cars);
    setTimeout(() => {
      this.isLoading = false;
    }, 400);
  }

  private _selectCar(car: Car) {
    this.selectedCar = car === this.selectedCar ? null : car;
    console.log(car);
  }

  private async _editCar(selectedCar: Car | null) {
    console.log(selectedCar);
    if (!this.selectedCar) return;
  }

  private async _deleteCar(selectedCar: Car) {
    if (this.selectedCar) {
      this.isLoading = true;
      await DELETE('cars', selectedCar._id);
      this.isLoading = false;
      this.selectedCar = null;
      this._getCars();
    }
  }

  render() {
    return html`
      ${this.isLoading
        ? html`
            <loading-container>
              <small>Loading..</small>
              <cst-loading size="24"></cst-loading>
            </loading-container>
          `
        : html`
            <header>
              <h2 class="title">
                Vehicle Inventory
              </h2>
            </header>
            <table>
              <table-actions>
                <a ?hidden=${this.selectedCar} href="/add-vehicle" alt="Add Vehicle" class="button float-right">
                  Add Car
                  <svg viewBox="0 0 24 24">
                    <path d=${plusIcon} />
                  </svg>
                </a>
                <a ?hidden=${!this.selectedCar} @click=${() => this._editCar(this.selectedCar)} class="button button-outline float-right">
                  Edit Car
                  <svg viewBox="0 0 24 24">
                    <path d=${editIcon} />
                  </svg>
                </a>
                <a ?hidden=${!this.selectedCar} @click=${() => this._deleteCar(this.selectedCar!)} class="button float-right">
                  Delete Car
                  <svg viewBox="0 0 24 24">
                    <path d=${deleteIcon} />
                  </svg>
                </a>
              </table-actions>

              <tr>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
              </tr>
              ${this.cars.map(
                car => html`
                  <tr
                    ?selected=${this.selectedCar === car}
                    @click=${() => {
                      this._selectCar(car);
                    }}
                  >
                    <td>${car.make}</td>
                    <td>${car.model}</td>
                    <td>${car.year}</td>
                  </tr>
                `
              )}
            </table>

            <img alt="car" src="images/undraw_fast_car.svg" />
          `}
    `;
  }
}

export interface Car {
  _id: string;
  make: string;
  model: string;
  year: string;
}
