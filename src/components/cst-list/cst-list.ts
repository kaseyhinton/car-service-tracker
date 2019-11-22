import { LitElement, customElement, html, css, property } from 'lit-element';
import CSTStyles from '../../styles/cst-styles/cst-styles';
import { plusIcon, editIcon, deleteIcon } from '../../utilities/icons';
import { GET, DELETE } from '../../utilities/api';

import '../cst-title/cst-title';
import '../cst-loading/cst-loading';
import '../cst-loading/cst-loading-container';
import { NavigateEvent } from '../../utilities/events';

@customElement('cst-list')
export default class CSTListElement extends LitElement {
  @property({ type: Array }) cars: Array<Car> = [];
  @property({ type: Object }) selectedCar: Car | null;
  @property({ type: Boolean }) isLoading: boolean = false;

  static styles = css`
    ${CSTStyles} :host {
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
      margin: 16px;
    }

    tr {
      user-select: none;
      cursor: pointer;
    }

    tr[selected] {
      background: #eee;
      transition: 0.3s ease;
    }

    a.button[add-vehicle] {
      align-self: flex-end;
      border-radius: 50%;
      padding: 0;
      width: 48px;
      height: 48px;
      align-items: center;
      justify-content: center;
    }

    a.button[add-vehicle] svg {
      margin: 0;
    }

    a.button {
      display: flex;
      margin-left: 16px;
      opacity: 1;
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

    flex-spacer {
      display: flex;
      flex: 1 1 auto;
    }

    [invisible] {
      opacity: 0 !important;
    }
  `;

  firstUpdated() {
    this._getCars();
  }

  private async _getCars() {
    this.isLoading = true;
    this.cars = [];
    this.cars = await GET('cars');
    this.isLoading = false;
  }

  private _selectCar(car: Car) {
    this.selectedCar = car === this.selectedCar ? null : car;
  }

  private async _editCar(selectedCar: Car) {
    if (!this.selectedCar) return;
    this.dispatchEvent(new NavigateEvent(`/vehicle/${selectedCar._id}`));
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
            <cst-loading-container>
              <cst-loading size="24"></cst-loading>
            </cst-loading-container>
          `
        : html`
            <cst-title imagePath="images/undraw_fast_car.svg" title="Vehicles"></cst-title>
            <table>
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

            <table-actions>
              <a
                ?invisible=${!this.selectedCar}
                @click=${() => this._editCar(this.selectedCar!)}
                class="button button-outline float-right"
                alt="Edit Vehicle"
                title="Edit Vehicle"
              >
                Edit
                <svg viewBox="0 0 24 24">
                  <path d=${editIcon} />
                </svg>
              </a>
              <a
                ?invisible=${!this.selectedCar}
                @click=${() => this._deleteCar(this.selectedCar!)}
                class="button float-right"
                alt="Delete Vehicle"
                title="Delete Vehicle"
              >
                Delete
                <svg viewBox="0 0 24 24">
                  <path d=${deleteIcon} />
                </svg>
              </a>
            </table-actions>
            <flex-spacer></flex-spacer>
            <a add-vehicle href="/add-vehicle" title="Add Vehicle" alt="Add Vehicle" class="button float-right">
              <svg viewBox="0 0 24 24">
                <path d=${plusIcon} />
              </svg>
            </a>
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
