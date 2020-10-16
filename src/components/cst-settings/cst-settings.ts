import { LitElement, html, customElement, css, property, queryAll } from 'lit-element';
import CSTStyles from '../../styles/cst-styles/cst-styles';
import { getApiUrl, getJsonboxKeyFromUrl, updateJsonboxKey } from '../../utilities/api';
import { NavigateEvent } from '../../utilities/events';

import '../cst-title/cst-title';
import '../cst-loading/cst-loading';
import '../cst-loading/cst-loading-container';
import { Car } from '../cst-list/cst-list';

@customElement('cst-settings')
export default class CSTSettingsElement extends LitElement {
  @property({ type: String }) jsonboxKey: string = '';
  @property({ type: Boolean }) isLoading: boolean = false;
  @property({ type: Object }) car: Car;
  @queryAll('input') allInputs: NodeListOf<HTMLInputElement>;

  firstUpdated() {
    this._getKey();
  }

  private async _getKey() {
    const apiUrl = getApiUrl() || '';
    this.jsonboxKey = getJsonboxKeyFromUrl(apiUrl);
  }

  public validate() {
    return Array.from(this.allInputs).every(element => {
      return element.reportValidity();
    });
  }

  private async _save() {
    if (!this.validate()) {
      return;
    }

    updateJsonboxKey(this.jsonboxKey);
    this.dispatchEvent(new NavigateEvent('/'));
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
            <cst-title imagePath="images/undraw_set_preferences_kwia.svg" title="Settings"></cst-title>

            <form>
              <label for="jsonboxkey">Jsonbox key</label>
              <input
                required
                pattern="[a-zA-Z0-9_]{20,}"
                title="alphanumeric characters & _. At least 20 characters long."
                id="jsonboxkey"
                autocomplete="off"
                @input=${event => {
                  this.jsonboxKey = event.target.value;
                }}
                .value=${this.jsonboxKey}
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
