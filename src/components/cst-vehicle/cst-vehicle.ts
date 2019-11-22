import { LitElement, html, customElement, css, property, queryAll } from 'lit-element';
import CSTStyles from '../../styles/cst-styles/cst-styles';
import { GET, PUT } from '../../utilities/api';
import { NavigateEvent } from '../../utilities/events';

import '../cst-title/cst-title';
import '../cst-loading/cst-loading';
import '../cst-loading/cst-loading-container';
import { CSTSnackbarSingleton } from '../cst-snackbar/cst-snackbar';
import { Car } from '../cst-list/cst-list';

@customElement('cst-vehicle')
export default class CSTVehicle extends LitElement {
  @property({ type: String }) vehicleId: string;
  @property({ type: String }) make: string = '';
  @property({ type: String }) model: string = '';
  @property({ type: String }) year: string = '';
  @property({ type: Boolean }) isLoading: boolean = false;
  @property({ type: Object }) car: Car;
  @queryAll('input') allInputs: NodeListOf<HTMLInputElement>;

  firstUpdated() {
    this._getCar();
  }

  private async _getCar() {
    this.isLoading = true;
    const car = await GET(`cars/${this.vehicleId}`);
    if (car) {
      this.isLoading = false;
      this.car = car;
      this.make = car.make;
      this.model = car.model;
      this.year = car.year;
    }
  }

  public reset() {
    this.make = '';
    this.model = '';
    this.year = '';
  }

  public validate() {
    return Array.from(this.allInputs).every(element => {
      return element.reportValidity();
    });
  }

  private async _save() {
    if (!this.validate()) {
      CSTSnackbarSingleton.open('Please fill out each of the required fields');
      return;
    }

    this.isLoading = true;

    const result = await PUT(`cars/${this.vehicleId}`, {
      make: this.make,
      model: this.model,
      year: this.year,
    });
    if (result) {
      this.dispatchEvent(new NavigateEvent('/'));
    }
    this.isLoading = false;
  }

  static styles = css`
    ${CSTStyles} :host {
      display: flex;
      flex-direction: column;
      margin: 16px;
    }

    a.button {
      display: flex;
      align-items: center;
      align-self: flex-end;
    }

    a.button[disabled] {
      pointer-events: none;
      user-select: none;
    }
  `;
  render() {
    return html`
      ${this.isLoading
        ? html`
            <cst-loading-container>
              <cst-loading size="24"></cst-loading>
            </cst-loading-container>
          `
        : html`
            <cst-title imagePath="images/undraw_off_road.svg" title="Edit Vehicle"></cst-title>

            <form>
              <label for="make">Make</label>
              <input
                required
                id="make"
                type="text"
                autocomplete="off"
                @input=${event => {
                  this.make = event.target.value;
                }}
                .value=${this.make}
              />
              <label for="model">Model</label>
              <input
                required
                id="model"
                type="text"
                autocomplete="off"
                @input=${event => {
                  this.model = event.target.value;
                }}
                .value=${this.model}
              />
              <label for="year">Year</label>
              <input
                required
                id="year"
                type="number"
                autocomplete="off"
                @input=${event => {
                  this.year = event.target.value;
                }}
                .value=${this.year}
              />
            </form>
            <a class="button" ?disabled=${this.isLoading} @click=${this._save}>
              ${this.isLoading
                ? html`
                    <cst-loading size="24"></cst-loading>
                  `
                : 'Save'}
            </a>
          `}
    `;
  }
}
