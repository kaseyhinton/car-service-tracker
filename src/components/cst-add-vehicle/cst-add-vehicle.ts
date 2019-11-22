import { LitElement, html, customElement, css, property, queryAll } from 'lit-element';
import CSTStyles from '../../styles/cst-styles/cst-styles';
import { POST } from '../../utilities/api';
import { NavigateEvent } from '../../utilities/events';

import '../cst-title/cst-title';
import '../cst-loading/cst-loading';
import '../cst-loading/cst-loading-container';
import { CSTSnackbarSingleton } from '../cst-snackbar/cst-snackbar';

@customElement('cst-add-vehicle')
export default class CSTAddVehicle extends LitElement {
  @property({ type: String }) make: string = '';
  @property({ type: String }) model: string = '';
  @property({ type: String }) year: string = '';
  @property({ type: Boolean }) isLoading: boolean = false;

  @queryAll('input') allInputs: NodeListOf<HTMLInputElement>;

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

    const result = await POST('cars', {
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
            <cst-title imagePath="images/undraw_city_driver.svg" title="Add Vehicle"></cst-title>
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

              <a class="button" ?disabled=${this.isLoading} @click=${this._save}>
                Save
              </a>
            </form>
          `}
    `;
  }
}
