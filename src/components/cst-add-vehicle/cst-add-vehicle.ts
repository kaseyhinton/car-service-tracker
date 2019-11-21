import { LitElement, html, customElement, css, property, queryAll } from 'lit-element';
import CSTStyles from '../../styles/cst-styles/cst-styles';
import { POST } from '../../utilities/api';
import { NavigateEvent } from '../../utilities/events';

import '../cst-loading/cst-loading';
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

    await POST('cars', {
      make: this.make,
      model: this.model,
      year: this.year,
    });

    setTimeout(() => {
      this.dispatchEvent(new NavigateEvent('/'));
      this.isLoading = false;
    }, 400);
  }

  static styles = css`
    ${CSTStyles} :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 16px 0;
    }

    a.button {
      display: flex;
      align-items: center;
    }

    a.button[disabled] {
      pointer-events: none;
      user-select: none;
    }

    img {
      width: 248px;
      height: 248px;
    }
  `;
  render() {
    return html`
      <img alt="car" src="images/undraw_city_driver.svg" />
      <h2>Add a Vehicle</h2>
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
    `;
  }
}
